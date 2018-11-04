import React, { Component } from 'react';
import { Table, Button, Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Shipment from '../../ethereum/shipment'
import factory from '../../ethereum/factory';
import { Link } from '../../routes';
import RequestRow from '../../components/RequestRow'


class ShippingsShow extends Component {

  static async getInitialProps(props) {
    const tracking = await factory.methods.getCustomers().call();
    const amountofcustomers = await factory.methods.amountofcustomers().call();
    const amountofshimpents = await Promise.all(
      Array(parseInt(amountofcustomers)).fill().map((element, index) => {
        return factory.methods.getAmountofShipments(tracking[index]).call()
      })
    );
    const shippaddress = await Promise.all(
        Array(parseInt(amountofshimpents)).fill().map((element, index) => {
        return factory.methods.getDeployedShipments(props.query.address, index).call()
      })
    );
    return { address: props.query.address, shippaddress };
  }

  renderShipments() {
    const items = this.props.shippaddress.map(shippaddress => {
      return {
        header: shippaddress,
      description: (
          <Link route={`/Shippings/${this.props.address}/${shippaddress}`}>
            <a>Show Shipping</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }


  render() {
    const { Header, Row, HeaderCell, Body} = Table
    return (
      <Layout>
        <div>
          <h3>All Shippings</h3>
          <Link route={`/Shippings/${this.props.address}/new`}>
            <a>
              <Button primary floated="right" style={{ marginBottom: 10 }}>Add Shipping</Button>
            </a>
          </Link>
          {this.renderShipments()}
        </div>
      </Layout>
    );
  }
}

export default ShippingsShow;
