import { render } from "react-dom";
import App from "./App";
import "./index.scss";

render(<App />, document.querySelector("#root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log(`Register sw. Scope is ${registration.scope}`);
    })
    .catch((err) => {
      console.log(`Fail: ${err}`);
    });
}
