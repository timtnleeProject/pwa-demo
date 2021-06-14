import { Route, Switch } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/admin" exact>
        <Admin />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
