import web3 from './web3';
import ShipmentFactory from './build/ShipmentFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ShipmentFactory.interface),
  '0x5AA7D34B4B48b2019E0E06e16B2DCD8bc652a488'
);

export default instance;
