import { render } from "solid-js/web";

const MySolidComponent = () => {
  return (
    <div>
      <p>Solid.js Component - REMOTE COMPONENT</p>
    </div>
  );
};

customElements.define(
  "my-solid-component",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
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
