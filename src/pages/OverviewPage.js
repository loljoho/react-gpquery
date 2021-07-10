import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import DriverTableContainer from '../components/Driver/DriverTableContainer';
import ConstructorTableContainer from '../components/Constructor/ConstructorTableContainer';
import RaceTableContainer from '../components/Race/RaceTableContainer';

class OverviewPage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <RaceTableContainer />
          </Col>
        </Row>
        <Row>
          <Col lg="8">
            <DriverTableContainer />
          </Col>
          <Col lg="4">
            <ConstructorTableContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default OverviewPage;
