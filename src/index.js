import { render } from "react-dom";
import App from "./App";
import "./index.scss";

render(<App />, document.querySelector("#root"));

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log(`Register sw. Scope is ${registration.scope}`);
      // subscribe user
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BBLWcX2o9qUk1S5cS_58QK-B7hjw6yf-rrLrqRpi_z9S0OgaoUD9Y2bZI9ZThMfcu6YBSXkNVPKH2Mx2QThnUzQ"
        ),
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then((pushSubscription) => {
      console.log(
        "Received PushSubscription: ",
        JSON.stringify(pushSubscription)
      );
      return fetch("/api/subscription/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pushSubscription),
      });
    })
    .catch((err) => {
      console.log(`Fail: ${err}`);
    });
}
