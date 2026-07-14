# TPbuzz

Where Theme Parks Come Alive.

This repository contains the first production foundation for the TPbuzz web application. It currently provides a responsive pre-launch page and a minimal health endpoint at `/health`.

## Requirements

- Node.js 24 LTS
- npm 11+

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm ci
npm run build
npm run start
```

The application listens on `127.0.0.1:3000`, matching the CloudPanel Node.js site configuration without exposing the Node process directly to the internet.

## First CloudPanel deployment

Run these commands as the `tpbuzz` site user from:

```text
/home/tpbuzz/htdocs/www.tpbuzz.com
```

Preserve the `.well-known` directory when replacing CloudPanel's placeholder files. After the repository files are present:

```bash
npm install
npm run build
npm install pm2@latest --global
pm2 start npm --name tpbuzz-web -- start
pm2 save
```

Verify locally on the VPS:

```bash
curl --fail http://127.0.0.1:3000/health
pm2 status
```

CloudPanel's Nginx virtual host proxies the public site to port `3000`. Configure PM2 resurrection after reboot only after the initial process and health check succeed.

## Subsequent CloudPanel deployments

The checked-in deployment script performs a locked, fast-forward-only deployment from `origin/main`. It refuses to run as root or with uncommitted server changes.

Validate the environment without changing it:

```bash
./scripts/deploy.sh --check
```

Deploy the latest approved `main` commit:

```bash
./scripts/deploy.sh
```

Deployment logs are written outside the web root under:

```text
/home/tpbuzz/logs/tpbuzz/
```

The staging script intentionally does not attempt an automatic rollback. A failed build leaves the existing PM2 process running; inspect the deployment log before taking further action. Release-directory deployments and automated rollback will be introduced before production launch.

## Pre-launch indexing

`robots.txt` deliberately blocks indexing until the production content and canonical-domain configuration are approved.
