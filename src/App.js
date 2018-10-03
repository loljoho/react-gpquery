import React, { Component } from 'react';
import DriverTableContainer from './DriverTableContainer';
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
        <DriverTableContainer />
      </div>
    );
  }
}

export default App;
