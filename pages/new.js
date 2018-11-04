import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Button, Input, Message, Label } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Router } from '../routes';

class CustomerNew extends Component {
  state = {
    addressCustomer: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.addcustomer(this.state.addressCustomer).send({
        from: accounts[0]
      });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return(
      <Layout>
        <h3>Add a new Customer</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Address of your Customer</label>
            <Input
              label="address"
              labelPosition="right"
              value={this.state.addressCustomer}
              onChange={event =>
                this.setState({ addressCustomer: event.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Add</Button>

        </Form>
      </Layout>
    );
  }
}

export default CustomerNew;
