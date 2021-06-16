import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, seticon] = useState("icons/icon_x96.png");
  const [url, seturl] = useState("");
  const [loading, setloading] = useState(false);
  const notify = () => {
    setloading(true);
    fetch("/api/subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, icon, data: { url } }),
    }).finally(() => {
      setloading(false);
    });
  };

  const bgSync = () => {
    navigator.serviceWorker.ready.then((registration) =>
      registration.sync.register("notify")
    );
  };
  return (
    <div>
      <div>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>

      <div>
        Body:
        <input value={body} onChange={(e) => setBody(e.target.value)}></input>
      </div>

      <div>
        Icon:
        <input value={icon} onChange={(e) => seticon(e.target.value)}></input>
      </div>

      <div>
        Open (url):
        <input value={url} onChange={(e) => seturl(e.target.value)}></input>
      </div>

      <button onClick={notify} disabled={!title || loading}>
        Send
      </button>

      <br />

      <button onClick={bgSync}>Background Sync</button>
    </div>
  );
}
