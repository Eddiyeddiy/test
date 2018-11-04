const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ShipmentFactory.json');

const provider = new HDWalletProvider(
  'nephew digital spare very salute bag virtual trophy rifle element gift wood',
  'https://rinkeby.infura.io/v3/2fd39417495e4267977a5ee32f26029a'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1500000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
