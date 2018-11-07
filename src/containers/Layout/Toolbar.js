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
import './Toolbar.css';

class Toolbar extends Component {
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
      <Navbar className="Toolbar" color="dark" dark expand="md">
        <NavbarBrand href="/">GPQuery</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#/races">Races</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/drivers">Drivers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/constructors">Constructors</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Season
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  2018
                </DropdownItem>
                <DropdownItem>
                  2017
                </DropdownItem>
                <DropdownItem>
                  2016
                </DropdownItem>
                <DropdownItem>
                  2015
                </DropdownItem>
                <DropdownItem>
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
    );
  }
}

export default Toolbar;
