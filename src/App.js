import React, { Component } from 'react';
import DriverTableContainer from './DriverTableContainer';
import RaceTableContainer from './RaceTableContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GPQuery</h1>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <DriverTableContainer />
            </div>
            <div className="col-sm-8">
              <RaceTableContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
