## Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)

### Module federation and web component CSS Major take aways

File Paths Are Crucial: Double and triple-check all your file paths, especially in module federation environments.
Shadow DOM and CSS: Understand how the Shadow DOM works and how to correctly apply CSS within it using Constructible Stylesheets and adoptedStyleSheets.
import.meta.url: This is the most reliable way to resolve file paths, especially in module federation.
fetch and URLs: Remember that fetch expects a URL string, not a URL object.
Build Tool Configuration: Module federation and other build tool plugins can affect how assets are handled.
Caching: Browser and build tool caching can cause unexpected behavior.
Debugging Methodically: Break down the problem into smaller parts and test each part in isolation.
Console Errors and Network Tab: Use the browser's developer tools to inspect network requests and console errors.
