import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
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
                <NavLink href="/races">Races</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/results">Results</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/drivers">Drivers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/constructors">Constructors</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Season
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" href="/races/2018">
                    2018
                  </DropdownItem>
                  <DropdownItem tag="a" href="/races/2017">
                    2017
                  </DropdownItem>
                  <DropdownItem tag="a" href="/races/2016">
                    2016
                  </DropdownItem>
                  <DropdownItem tag="a" href="/races/2015">
                    2015
                  </DropdownItem>
                  <DropdownItem tag="a" href="/races/2014">
                    2014
                  </DropdownItem>
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
