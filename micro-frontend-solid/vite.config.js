import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    solid(),
    federation({
      name: "solid_app", // Unique name for this micro-frontend
      filename: "remoteEntry.js", // Name of the entry point file
      remotes: {
        solidapp: "http://localhost:5020/dist/assets/remoteEntry.js",
        cart: "http://localhost:5003/dist/assets/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/components/MySolidComponent/MySolidComponent.jsx", // Expose the Solid.js component
        "./AddToCart": "./src/components/AddToCart/AddToCart.jsx",
        "./PlaceAddToCart": "./src/PlaceAddToCart.jsx",
      },
      shared: ["solid-js"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext", // or 'modules' for wider modern browser support
    minify: false, // For development, set to false for easier debugging
    cssCodeSplit: false,
  }, // Add this for JSX support in .js files (OR rename to .jsx)
  // esbuild: {
  //   jsxFactory: "h",
  //   jsxFragment: "Fragment",
  //   jsxInject: `import { h, Fragment } from 'solid-js'`,
  // },
});
