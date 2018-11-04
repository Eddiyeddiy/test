import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

class ShippingNew extends Component {
  static async getInitialProps(props) {
    const { address } = props.query

    return { address };
  }

  state = {
    name: '',
    amount: '',
    origin: '',
    destination: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const { name, amount, origin, destination} = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createShipment(this.props.address, name, amount,
        origin, destination)
        .send({ from: accounts[0]});
      Router.pushRoute(`/Shippings/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/Shippings/${this.props.address}`}>
          <a>
            Back
          </a>
        </Link>
        <h3>Create a Shipping</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Amount</label>
            <Input
              value={this.state.amount}
              onChange={event =>
                this.setState({ amount: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Origin</label>
            <Input
              value={this.state.origin}
              onChange={event =>
                this.setState({ origin: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Destination</label>
            <Input
              value={this.state.destination}
              onChange={event =>
                this.setState({ destination: event.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary>Create !</Button>
        </Form>
      </Layout>
    );
  }
}

export default ShippingNew;
