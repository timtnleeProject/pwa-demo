import { css } from "@emotion/react";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <header
        css={css`
          padding: 12px;
          background-color: skyblue;
          text-align: center;
        `}
      >
        <h1
          css={css`
            font-weight: lighter;
            margin: 0;
          `}
        >
          PWA DEMO
        </h1>
        <div
          css={css`
            padding: 8px;
            a {
              margin: 0 12px;
            }
          `}
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </header>
      <main
        css={css`
          position: relative;
          width: 100%;
          padding: 12px;
          margin: 0 auto;
          max-width: 1200px;
        `}
      >
        <Routes />
      </main>
    </div>
  );
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
