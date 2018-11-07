import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import './Layout.css';

import Header from './Header';
import Footer from './Footer';

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
        <Header />
        <div className="app-body">
          <main role="main">
            <Container>
              <Switch>
                <Route path="/races" component={RaceTableContainer} />
                <Route path="/drivers" component={DriverTableContainer} />
                <Route path="/constructors" component={ConstructorTableContainer} />
                <Redirect from="/" to="/races" />
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
