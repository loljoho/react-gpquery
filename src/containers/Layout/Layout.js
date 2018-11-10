import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import './Layout.css';

// Layout Components
import Header from './Header';
import Footer from './Footer';

// Pages
import {
  OverviewPage,
  TablePage,
} from '../../pages';

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
                <Route path="/table" component={TablePage} />
                <Route path="/overview" component={OverviewPage} />
                <Route path="/races" component={RaceTableContainer} />
                <Route path="/drivers" component={DriverTableContainer} />
                <Route path="/constructors" component={ConstructorTableContainer} />
                <Redirect from="/" to="/table" />
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
