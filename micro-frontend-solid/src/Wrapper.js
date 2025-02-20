import { render } from "solid-js";
import MySolidComponent from "./MySolidComponent"; // Your Solid.js component

customElements.define(
  "my-solid-component",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" }); // Use shadow DOM (recommended)
      render(() => <MySolidComponent />, shadowRoot);
    }
  }
);
