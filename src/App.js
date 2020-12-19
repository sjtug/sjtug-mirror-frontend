import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Docs from "./Docs";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop>
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
      </ScrollToTop>
    </Router>
  );
}

export default App;
