import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  function setCounter() {
    console.log("In setCounter function");
    setCount(count() + 1);
  }

  return (
    <div>
      <h1>Solid.js Micro-frontend </h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCounter()}>Increment</button>
      <my-solid-component></my-solid-component>
    </div>
  );
}

export default App;
