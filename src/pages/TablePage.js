import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import QualifyingTableContainer from '../components/Qualifying/QualifyingTableContainer';

class TablePage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <QualifyingTableContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default TablePage;
