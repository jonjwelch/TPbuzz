#!/usr/bin/env bash

set -Eeuo pipefail
umask 027

readonly APP_NAME="${APP_NAME:-tpbuzz-web}"
readonly DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
readonly DEPLOY_REMOTE="${DEPLOY_REMOTE:-origin}"
readonly HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/health}"
readonly HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-15}"
readonly HEALTH_DELAY_SECONDS="${HEALTH_DELAY_SECONDS:-2}"

mode="deploy"

usage() {
  cat <<'EOF'
Usage: ./scripts/deploy.sh [--check]

  --check  Validate the deployment environment without changing anything.
EOF
}

log() {
  printf '[%s] %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"
}

fail() {
  log "ERROR: $*"
  exit 1
}

if [[ $# -gt 1 ]]; then
  usage
  exit 2
fi

if [[ $# -eq 1 ]]; then
  case "$1" in
    --check) mode="check" ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
fi

[[ "${EUID}" -ne 0 ]] || fail "Run this script as the CloudPanel site user, never as root."

for command_name in git npm pm2 curl flock; do
  command -v "${command_name}" >/dev/null 2>&1 || fail "Required command not found: ${command_name}"
done

project_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "Run this inside the TPbuzz Git repository."
cd "${project_root}"

current_branch="$(git branch --show-current)"
[[ "${current_branch}" == "${DEPLOY_BRANCH}" ]] || fail "Expected branch ${DEPLOY_BRANCH}; found ${current_branch:-detached HEAD}."

if [[ -n "$(git status --porcelain)" ]]; then
  git status --short
  fail "The working tree is not clean. Commit, restore, or remove local changes first."
fi

pm2 describe "${APP_NAME}" >/dev/null 2>&1 || fail "PM2 application not found: ${APP_NAME}"

if [[ "${mode}" == "check" ]]; then
  curl --fail --silent --show-error "${HEALTH_URL}" >/dev/null || fail "Health endpoint failed: ${HEALTH_URL}"
  log "Deployment environment is ready."
  log "Repository: ${project_root}"
  log "Branch: ${current_branch}"
  log "Application: ${APP_NAME}"
  log "Health endpoint: ${HEALTH_URL}"
  exit 0
fi

mkdir -p "${HOME}/.cache/tpbuzz" "${HOME}/logs/tpbuzz"
exec 9>"${HOME}/.cache/tpbuzz/deploy.lock"
flock -n 9 || fail "Another TPbuzz deployment is already running."

log_file="${HOME}/logs/tpbuzz/deploy-$(date -u +'%Y%m%dT%H%M%SZ').log"
exec > >(tee -a "${log_file}") 2>&1
trap 'log "Deployment failed at line ${LINENO}. The existing PM2 process has not been intentionally stopped."' ERR

previous_sha="$(git rev-parse HEAD)"
log "Starting deployment from ${previous_sha}."

git fetch --prune "${DEPLOY_REMOTE}" "${DEPLOY_BRANCH}"
target_sha="$(git rev-parse "${DEPLOY_REMOTE}/${DEPLOY_BRANCH}")"

if [[ "${previous_sha}" == "${target_sha}" ]]; then
  log "Already at ${target_sha}; no deployment required."
  curl --fail --silent --show-error "${HEALTH_URL}" >/dev/null
  exit 0
fi

git merge --ff-only "${target_sha}"
log "Updated source to ${target_sha}."

npm ci
npm run build

pm2 restart "${APP_NAME}" --update-env
pm2 save

health_ok="false"
for ((attempt = 1; attempt <= HEALTH_ATTEMPTS; attempt++)); do
  if curl --fail --silent --show-error "${HEALTH_URL}" >/dev/null; then
    health_ok="true"
    break
  fi

  log "Health check ${attempt}/${HEALTH_ATTEMPTS} failed; retrying in ${HEALTH_DELAY_SECONDS}s."
  sleep "${HEALTH_DELAY_SECONDS}"
done

if [[ "${health_ok}" != "true" ]]; then
  pm2 logs "${APP_NAME}" --lines 30 --nostream || true
  fail "Deployment started but the health endpoint did not recover."
fi

log "Deployment complete: ${target_sha}."
log "Health endpoint passed: ${HEALTH_URL}."
log "Deployment log: ${log_file}."
