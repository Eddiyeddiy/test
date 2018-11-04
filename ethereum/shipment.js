import web3 from './web3';
import Shipment from './build/Shipment.json';

export default shippaddress => {
  return new web3.eth.Contract(
    JSON.parse(Shipment.interface),
    shippaddress
  );
};
