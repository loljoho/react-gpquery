import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import './Layout.css';

import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

// Components
import {
  ConstructorTableContainer,
  DriverTableContainer,
  RaceTableContainer
} from '../../components';

class Layout extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Container fluid>
                <Switch>
                  <Route exact path="/" component={RaceTableContainer} />
                  <Route path="/races" component={RaceTableContainer} />
                  <Route path="/drivers" component={DriverTableContainer} />
                  <Route path="/constructors" component={ConstructorTableContainer} />
                </Switch>
              </Container>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
