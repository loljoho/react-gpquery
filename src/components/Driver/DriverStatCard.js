import React, { Component } from 'react';
import {
  Card,
  CardSubtitle,
  CardText,
  Col,
} from 'reactstrap';

//import moment from 'moment';

class DriverStatCard extends Component {
  render() {
    return (
      <Col xs="6" sm="4" md="3" lg="2">
        <Card body className="mb-2">
          <CardSubtitle>{this.props.name}</CardSubtitle>
          <CardText className="text-right">{this.props.value}</CardText>
        </Card>
      </Col>
    );
  }
}

export default DriverStatCard;
