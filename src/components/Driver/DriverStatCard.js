import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import moment from 'moment';

class DriverStatCard extends Component {
  render() {
    return (
      <Col xs="6" sm="4" md="3" lg="2">
        <Card body className="mb-4">
          <CardTitle className="mb-0 text-center">
            {this.props.value}
            <small className="float-right">
              <FontAwesomeIcon icon={`${this.props.icon}`} />
            </small>
          </CardTitle>
          <CardText className="text-center"><small>{this.props.name}</small></CardText>
        </Card>
      </Col>
    );
  }
}

export default DriverStatCard;
