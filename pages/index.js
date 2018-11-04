import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Table, Button, Card, Message, List } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CustomerIndex extends Component {
  static async getInitialProps() {
    const amountofcustomers = await factory.methods.amountofcustomers().call();

    const tracking = await factory.methods.getCustomers().call()

    const amountofshimpents = await Promise.all(
      Array(parseInt(amountofcustomers)).fill().map((element, index) => {
        return factory.methods.getAmountofShipments(tracking[index]).call()
      })
    );

    console.log(amountofshimpents);

    return {tracking, amountofcustomers, amountofshimpents};
  }

  renderCustomers() {
    const items = this.props.tracking.map((address, index) => {
      return {
        header: address,
        description: (
          <List>
            <Link route={`/Shippings/${address}`}>
            <a>
              View Shippings
            </a>
            </Link>
            <Card floated='left'>
            <Message compact size='mini'>
            <Message.Header>Amount of Shipments: {this.props.amountofshimpents[index]} </Message.Header>
            </Message>
            </Card>
          </List>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>All Customers</h3>
          <Link route="/new">
            <a>
              <Button
                floated="right"
                content="Add new Customers"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCustomers()}
        </div>
      </Layout>
    )
  }
}

export default CustomerIndex;
