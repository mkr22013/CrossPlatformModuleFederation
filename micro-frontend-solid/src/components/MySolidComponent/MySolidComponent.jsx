import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import "./MySolidComponent.css";

function MySolidComponent({ id }) {
  const [clicked, setClicked] = createSignal(false);

  return (
    <div>
      <div>
        <p>Solid.js Component - REMOTE COMPONENT</p>
        <button onClick={() => setClicked(!clicked())}>Click Me</button>

        <p>Clicked: {clicked() ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}
export default MySolidComponent;

customElements.define(
  "my-solid-component",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");

      fetch("./MySolidComponent.css")
        .then((response) => {
          if (!response.ok) {
            // Check for HTTP errors
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const cssText = response.text();
          console.log("css file :", cssText);
          return cssText;
        })
        .then((css) => {
          console.log("Final CSS :", css);
          setTimeout(() => {
            // Wrap in a setTimeout (just for testing)
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(css);
            shadowRoot.adoptedStyleSheets = [sheet];
          }, 0); // 0ms delay - effectively executes after the current event loop

          const solidComponentRoot = document.createElement("div");
          shadowRoot.appendChild(solidComponentRoot);

          try {
            // Use a function to create and return the component and signals
            const createSolidComponent = () => {
              const component = render(
                () => <MySolidComponent />,
                solidComponentRoot
              );
              return {
                clicked: component.clicked,
                setClicked: component.setClicked,
              };
            };

            const solidComponent = createSolidComponent(); // Create the component instance
            this.clicked = solidComponent.clicked; // Attach to 'this'
            this.setClicked = solidComponent.setClicked; // Attach to 'this'

            shadowRoot.addEventListener("click", (event) => {
              if (
                event.target.tagName === "BUTTON" &&
                this.clicked &&
                this.setClicked
              ) {
                this.setClicked(!this.clicked());
                console.log("Button Clicked:", this.clicked());
              }
            });
          } catch (error) {
            console.error("Error rendering Solid.js component:", error);
            shadowRoot.innerHTML = "<p>Error loading component.</p>";
          }
        })
        .catch((error) => {
          // Handle fetch errors
          console.error("Error loading CSS:", error);
        });
    }
  }
);
