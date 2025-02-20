import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    solid(),
    federation({
      name: "solid_app", // Unique name for this micro-frontend
      filename: "remoteEntry.js", // Name of the entry point file
      remotes: { remote: "http://localhost:5020/dist/assets/remoteEntry.js" },
      exposes: {
        "./MySolidComponent": "./src/MySolidComponent.jsx", // Expose the Solid.js component
      },
      shared: {
        "solid-js": { singleton: true, requiredVersion: "1.9.4" },
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
