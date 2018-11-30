import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import DriverTableContainer from '../components/Driver/DriverTableContainer';
import ConstructorTableContainer from '../components/Constructor/ConstructorTableContainer';
import RaceTableContainer from '../components/Race/RaceTableContainer';

class DriverPage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <DriverDetailContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default DriverPage;
