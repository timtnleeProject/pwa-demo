import { useEffect } from "react";
import { render } from "react-dom";
import "./index.scss";

const App = () => {
  useEffect(() => {
    fetch("/api/list?page=1")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div>
      <h1>PWA DEMO</h1>
    </div>
  );
};

render(<App />, document.querySelector("#root"));
