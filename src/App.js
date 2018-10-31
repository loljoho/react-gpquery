import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

// Layout
import {
  Layout
} from './containers';

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
          <Switch>
            <Route path="/" name="Home" component={Layout} />
            <Route path="/races" component={RaceTableContainer} />
            <Route path="/drivers" component={DriverTableContainer} />
            <Route path="/constructors" component={ConstructorTableContainer} />
          </Switch>
        </div>
      </HashRouter>
    );
    /*
    return (
      <HashRouter>
        <div>
          <Toolbar />
          <div className="container-fluid">
            <div className="row">
              <Sidebar />
              <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                  <Route exact path="/" component={RaceTableContainer} />
                  <Route path="/races" component={RaceTableContainer} />
                  <Route path="/drivers" component={DriverTableContainer} />
                  <Route path="/constructors" component={ConstructorTableContainer} />
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </HashRouter>
    );
    */
  }
}

export default App;
