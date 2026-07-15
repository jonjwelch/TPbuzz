import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TPbuzz",
    short_name: "TPbuzz",
    description:
      "Discover theme parks, attractions, stories and planning tools in one connected place.",
    start_url: "/",
    display: "standalone",
    background_color: "#071521",
    theme_color: "#0a1f33",
    icons: [
      {
        src: "/brand/tpbuzz-mark-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/tpbuzz-mark-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/tpbuzz-mark-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
