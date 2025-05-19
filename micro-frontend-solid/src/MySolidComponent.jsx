import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import "./MySolidComponent.css";

const MySolidComponent = () => {
  const [clicked, setClicked] = createSignal(false);

  function ButtonClicked() {
    setClicked(!!clicked);
    console.log("button clicked Now: ", clicked());
  }

  console.log("button clicked now: ", clicked());
  return (
    <div>
      <p>Solid.js Component - REMOTE COMPONENT</p>
      <button onClick={() => ButtonClicked()}>Click Me</button>
    </div>
  );
};

let css = new CSSStyleSheet();
css.replaceSync("@import url(./MySolidComponent.css)");

// export function getGlobalStyleSheets() {
//   if (globalSheets === null) {
//     globalSheets = Array.from(document.styleSheets).map((x) => {
//       const sheet = new CSSStyleSheet();
//       if (x) {
//         const css = Array.from(x?.cssRules)
//           .map((rule) => rule.cssText)
//           .join(" ");
//         sheet.replaceSync(css);
//       }
//       return sheet;
//     });
//   }

//   return globalSheets;
// }

export function addGlobalStylesToShadowRoot(shadowRoot) {
  shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}

customElements.define(
  "my-solid-component",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.adoptedStyleSheets = [css];
      //addGlobalStylesToShadowRoot(shadowRoot);
      try {
        render(() => <MySolidComponent />, shadowRoot);
      } catch (error) {
        console.error("Error rendering Solid.js component:", error);
        shadowRoot.innerHTML = "<p>Error loading component.</p>"; // Display an error message
      }
    }
  }
);

export default MySolidComponent;
