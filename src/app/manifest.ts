import type { MetadataRoute } from "next";
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION_AR,
} from "@/lib/seo-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | الدراسة في أوروبا`,
    short_name: "M&A Overseas",
    description: DEFAULT_DESCRIPTION_AR,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFBFD",
    theme_color: "#0B1B3D",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/logo/logo-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
