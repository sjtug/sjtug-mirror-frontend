import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Docs from "./Docs";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
