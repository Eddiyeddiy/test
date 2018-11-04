import React, { Component } from 'react';
import { Button, Table, Cell, Row, Message } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import Shipment from '../../../ethereum/shipment';
import web3 from '../../../ethereum/web3';

class ShippingDisplay extends Component {
  static async getInitialProps(props) {
    const { shippaddress } = props.query;
    const { address } = props.query;

    const shipment = Shipment(props.query.shippaddress);
    const data = await shipment.methods.getSummary().call()
    console.log(data);
    return {
      address,
      shippaddress,
      name: data[0],
      amount: data[1],
      origin: data[2],
      destination: data[3],
      status: data[4]
    }
  };

  state = {
    loading: false,
    errorMessage: ''
  }

  onSuccess = async () => {
    try {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: '' });
      const accounts = await web3.eth.getAccounts();
      const shipment = Shipment(this.props.shippaddress);
      await shipment.methods.succesfulShipment().send({
        from: accounts[0]
      });
      Router.pushRoute(`/Shippings/Attributes/${this.props.shippaddress}`);
    } catch (err){
      this.setState({ errorMessage: err.message});
    }
    this.setState({ loading: false });
  }


  render() {
        const { Header, Row, HeaderCell, Body, Cell} = Table
    const {
      shippaddress,
      name,
      amount,
      origin,
      destination,
      status
    } = this.props;

    return (
      <Layout>
      <h3>Shipping</h3>
      <Link route={`/Shippings/${this.props.address}`}>
        <a>
          Back
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Origin</HeaderCell>
            <HeaderCell>Destination</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </Row>
        </Header>
        <Body>
         <Row positive={status}>
          <Cell>{shippaddress}</Cell>
          <Cell>{name}</Cell>
          <Cell>{amount}</Cell>
          <Cell>{origin}</Cell>
          <Cell>{destination}</Cell>
          <Cell>
          {status ? null : (
            <Button loading={this.state.loading} color="red" basic onClick={this.onSuccess}>
              Success?
            </Button>
          )}
          </Cell>
         </Row>
        </Body>
      </Table>
      </Layout>
    );
  }
}

export default ShippingDisplay;
