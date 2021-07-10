import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import './Footer.css';

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
      <React.Fragment>
        <footer className="app-footer">
          <hr />
          <Container>
            <Row>
              <Col>
                <Nav>
                  <NavItem>
                    <NavLink href="#/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/loljoho/gpquery">GitHub</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://ergast.com/mrd/">Ergast</NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col>
                <p className="text-right py-2">Copyright &copy; 2012-2018</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default Toolbar;
