import { render } from "solid-js/web";
import AddToCart from "solidapp/AddToCart";

export default function PlaceAddToCart(el, id) {
  render(() => <add-to-cart id={id}></add-to-cart>, el);
}
