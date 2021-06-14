import { css } from "@emotion/react";
import { memo, useState } from "react";

export default memo(function NotifyPermission() {
  const [display, setDisplay] = useState(Notification.permission !== "granted");
  const grantPermission = () => {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      setDisplay(false);
    });
  };
  return display ? (
    <div
      css={css`
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 3px -3px 3px #555;
        padding: 30px;
        @media (min-width: 560px) {
          width: 500px;
        }
      `}
    >
      {Notification.permission === "denied" ? (
        <>
          <div>
            You have blocked notification from PWA-DEMO, please go to browser
            setting.
          </div>
          <button onClick={() => setDisplay(false)}>Close</button>
        </>
      ) : (
        <>
          <h4>Get Notification from PWA-DEMO!</h4>
          <button onClick={grantPermission}>Yes</button>
          <button onClick={() => setDisplay(false)}>Not now</button>
        </>
      )}
    </div>
  ) : null;
});
