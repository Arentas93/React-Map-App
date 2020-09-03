import React from "react";
import Map from "./Map/Map";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Greetings</h1>
      <h2>This is distance measurement Web Application!</h2>
      <h2>
        To see the distance beetween points select first and second point and
        after that scroll up or down. Distance beetween all points is summed up.
      </h2>
      <Map />
    </div>
  );
}
export default App;
