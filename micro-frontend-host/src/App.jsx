import React, { useState, lazy, Suspense } from "react";
import { MySolidComponent } from "solidapp/MySolidComponent";
function App() {
  return (
    <div>
      <h1>Host component</h1>
      <my-solid-component></my-solid-component>
    </div>
  );
}

export default App;
