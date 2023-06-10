import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";

function App() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
