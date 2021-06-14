import { useState } from "react";

export default function Admin() {
  const [message, setMessage] = useState("");
  const notify = () => {
    fetch("/api/subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  };
  return (
    <div>
      Message:
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={notify}>Send</button>
    </div>
  );
}
