import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">GPQuery</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item">
            <a className="nav-link" href="/">Link</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
