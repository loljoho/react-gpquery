import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import RaceTableContainer from '../components/Race/RaceTableContainer';

class TablePage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <RaceTableContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default TablePage;
