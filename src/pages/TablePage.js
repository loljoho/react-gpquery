import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import ResultTableContainer from '../components/Result/ResultTableContainer';

class TablePage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <ResultTableContainer />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default TablePage;
