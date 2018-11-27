import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import logo from './logo.svg';
import './App.css';

// Layout
import {
  Layout
} from './containers';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCar,
  faCarSide,
  faCarCrash,
  faTrafficLight,
  faRoad,
  faStopwatch,
  faFlag,
  faFlagCheckered,
  faTachometerAlt,
  faTrophy,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCar,
  faCarSide,
  faCarCrash,
  faTrafficLight,
  faRoad,
  faStopwatch,
  faFlag,
  faFlagCheckered,
  faTachometerAlt,
  faTrophy,
  faBirthdayCake,
)

// TODO: Refactor along with Layout Component
// Components
//import {
//  ConstructorTableContainer,
//  DriverTableContainer,
//  RaceTableContainer
//} from './components';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" name="Home" component={Layout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
