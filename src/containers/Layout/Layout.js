import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import './Layout.css';

import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

// TODO: Refactor these Component imports
import {
  ConstructorTableContainer,
  DriverTableContainer,
  RaceTableContainer
} from '../../components';

class Layout extends Component {
  render() {
    // TODO: Refactor route configurations
    return (
      <div className="app">
        <Toolbar />
        <Container fluid>
          <Row>
            <Sidebar />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Container fluid>
                <Switch>
                  <Route path="/races" component={RaceTableContainer} />
                  <Route path="/drivers" component={DriverTableContainer} />
                  <Route path="/constructors" component={ConstructorTableContainer} />
                  <Redirect from="/" to="/races" />
                </Switch>
              </Container>
            </main>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Layout;
