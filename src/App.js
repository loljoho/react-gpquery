import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

// Components
import {
  ConstructorTableContainer,
  DriverTableContainer,
  RaceTableContainer
} from './components';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">GPQuery</h1>
          </header>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={RaceTableContainer} />
              <Route path="/races" component={RaceTableContainer} />
              <Route path="/drivers" component={DriverTableContainer} />
              <Route path="/constructors" component={ConstructorTableContainer} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
