import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Core React runtime
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "react-vendor";
            }
            // Framer motion or animation libraries
            if (id.includes("framer-motion")) {
              return "motion-vendor";
            }
            // Icon packs (lucide, react-icons, etc.)
            if (id.includes("lucide") || id.includes("icons")) {
              return "icons-vendor";
            }
            // All other third-party dependencies
            return "vendor";
          }
        },
      },
    },
  },
});