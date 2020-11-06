import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Docs from "./Docs";
import Footer from "./Footer";

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
      <Footer></Footer>
    </Router>
  );
}

export default App;
