import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host_app",
      remotes: {
        solidapp: "http://localhost:5020/dist/assets/remoteEntry.js", // URL of the Solid.js micro-frontend (adjust port if needed)
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext", // or 'modules' for wider modern browser support
    minify: false, // For development, set to false for easier debugging
    cssCodeSplit: false,
  },
});
