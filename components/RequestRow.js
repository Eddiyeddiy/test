import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
class RequestRow extends Component {

  render() {
    const { Row, Cell } = Table;

    const { id, name, amount, origin, destination, status} = this.props;

    return (
      <h3> hallo</h3>
    );
  }
}

export default RequestRow;
