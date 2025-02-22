import { render } from "solid-js/web";
import { createEffect, createSignal, Show } from "solid-js";

import { jwt, addToCart } from "cart/cart";

function AddToCart({ id }) {
  const [loggedIn, setLoggedIn] = createSignal(true);

  createEffect(() => {
    return jwt.subscribe((jwt) => {
      setLoggedIn(!!jwt);
    });
  });
  return (
    <div className="my-component">
      <Show when={loggedIn()}>
        <button id={`addtocart_${id}`} onClick={() => addToCart(id)}>
          Add To Cart
        </button>
      </Show>
    </div>
  );
}
export default AddToCart;

customElements.define(
  "add-to-cart",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");

      fetch(new URL("./AddToCart.css", import.meta.url).toString())
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
            const createSolidComponent = () => {
              const id = this.getAttribute("id"); // Get the id from the attribute

              const component = render(
                () => <AddToCart id={id} />,
                solidComponentRoot
              ); // Correct way to pass props
              return {
                clicked: component.clicked,
                setClicked: component.setClicked,
              };
            };

            const solidComponent = createSolidComponent();
            this.clicked = solidComponent.clicked;
            this.setClicked = solidComponent.setClicked;

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
