import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import RateHistory from "./pages/RateHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import {ExcludedProvider} from './includedContext';
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ExcludedProvider>
        <div className="container-fluid App">
          <Route exact={true} path="/" component={ListView} />
          <Route exact={true} path="/history" component={RateHistory} />
        </div>
        </ExcludedProvider>
      </HashRouter>
    );
  }
}

export default App;