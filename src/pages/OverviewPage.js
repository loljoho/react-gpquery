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
          <Col>
            <DriverTableContainer />
          </Col>
          <Col>
            <ConstructorTableContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default OverviewPage;
