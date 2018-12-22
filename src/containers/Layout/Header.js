import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header className="app-header">
        <Navbar className="Header" color="dark" dark expand="md" fixed="top">
          <NavbarBrand href="/">GPQuery</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/races">Races</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/results">Results</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/drivers">Drivers</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/constructors">Constructors</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Season
                </DropdownToggle>
                <DropdownMenu right>
                  <Link className="dropdown-item" tabIndex="0" to="/races/2018">
                    2018
                  </Link>
                  <Link className="dropdown-item" tabIndex="0" to="/races/2017">
                    2017
                  </Link>
                  <Link className="dropdown-item" tabIndex="0" to="/races/2016">
                    2016
                  </Link>
                  <Link className="dropdown-item" tabIndex="0" to="/races/2015">
                    2015
                  </Link>
                  <Link className="dropdown-item" tabIndex="0" to="/races/2014">
                    2014
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem>
                    Older
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
