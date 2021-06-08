import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export default function OfflineWarning(props) {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    if (!window.navigator.onLine) {
      setOffline(true);
    } else {
      window.addEventListener("offline", (event) => {
        setOffline(true);
      });
      window.addEventListener("online", (event) => {
        setOffline(false);
      });
    }
  }, []);
  return offline ? (
    <div
      css={css`
        background-color: red;
        color: white;
        padding: 12px;
        text-align: center;
      `}
      {...props}
    >
      You&apos;re currently offline.
    </div>
  ) : null;
}
