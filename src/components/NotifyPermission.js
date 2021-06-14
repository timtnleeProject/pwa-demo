import { css } from "@emotion/react";
import { memo, useState } from "react";

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

const Btn = (props) => (
  <button
    css={css`
      padding: 8px 12px;
      border: 1px solid skyblue;
      cursor: pointer;
      background-color: white;
      margin-right: 8px;
    `}
    {...props}
  ></button>
);

export default memo(function NotifyPermission() {
  const [display, setDisplay] = useState(
    "PushManager" in window &&
      "serviceWorker" in navigator &&
      Notification.permission !== "granted"
  );
  const [cover, setCover] = useState(false);
  const grantPermission = () => {
    setCover(true);
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        if (!registration.active) return registration;
        // subscribe user
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BBLWcX2o9qUk1S5cS_58QK-B7hjw6yf-rrLrqRpi_z9S0OgaoUD9Y2bZI9ZThMfcu6YBSXkNVPKH2Mx2QThnUzQ"
          ),
        };
        return registration.pushManager
          .subscribe(subscribeOptions)
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
          });
      })
      .then(() => {
        setDisplay(false);
      })
      .catch((err) => {
        console.log(`Subscribe Fail: ${err}`);
      })
      .finally(() => {
        setCover(false);
      });
  };
  return display ? (
    <div
      css={css`
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: skyblue;
        box-shadow: -3px -3px 3px #555;
        padding: 30px;
        @media (min-width: 760px) {
          width: 500px;
        }
      `}
    >
      {cover && (
        <div
          css={css`
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
          `}
        ></div>
      )}
      {Notification.permission === "denied" ? (
        <>
          <div>
            You have blocked notification from PWA-DEMO, please go to browser
            setting.
          </div>
          <Btn onClick={() => setDisplay(false)}>Close</Btn>
        </>
      ) : (
        <>
          <h4>Get Notification from PWA-DEMO!</h4>
          <Btn onClick={grantPermission}>Yes</Btn>
          <Btn onClick={() => setDisplay(false)}>Not now</Btn>
        </>
      )}
    </div>
  ) : null;
});
