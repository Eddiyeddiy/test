pragma solidity ^0.4.17;

contract ShipmentFactory {
    address public insurance;
    mapping(address => uint) public amountofshimpents;
    address[] customers;
    uint public amountofcustomers;

    mapping(address => address[]) public shipments;

    constructor() public {
        insurance = msg.sender;
    }

    function addcustomer(address customer) public restricted{
        customers.push(customer);
        amountofshimpents[customer] = 0;
        amountofcustomers++;
    }

    modifier restricted() {
        require (msg.sender == insurance);
        _;
    }


    function createShipment(address customer, string n, int a,
      string o, string d) public restricted {
        address newShipment = new Shipment(customer, insurance, n, a, o, d);
        shipments[customer].push(newShipment);
        amountofshimpents[customer]++;
    }

    function getDeployedShipments(address x, uint y) public view returns (address) {
        return shipments[x][y];
    }

    function getCustomers() public view returns (address[]) {
        return customers;
    }

    function getAmountofShipments(address x) public view returns (uint) {
        return amountofshimpents[x];
    }
}

contract Shipment {
    address public insurance;
    address public costumer;

    string public name;
    int public amount;
    string public origin;
    string public destination;
    bool public success = false;

    bool public temperatur = true;
    int[] public temperaturvalue;

    bool public druck = true;
    int[] public druckvalue;

    constructor (address loguebergabe, address creator, string n,
      int a, string o, string d) public payable {
        costumer = loguebergabe;
        insurance = creator;
        name = n;
        amount = a;
        origin = o;
        destination = d;
    }

    function allerttemperature(int uebergabe) public payable {
        require(msg.sender == costumer);
        temperaturvalue.push(uebergabe);
        temperatur = false;
        costumer.transfer(this.balance);
    }

    function allertpressure(int uebergabe) public payable {
        require(msg.sender == costumer);
        druckvalue.push(uebergabe);
        druck = false;
        costumer.transfer(this.balance);
    }

    function succesfulShipment() public payable {
        require(msg.sender == costumer);
        insurance.transfer(this.balance);
        success = true;
    }

    function getSummary() public view returns (
      string, int, string, string, bool
      ) {
        return (
          name,
          amount,
          origin,
          destination,
          success
        );
      }

      function setValues(string n, int a, string o, string d) public {
        require(msg.sender == insurance);
        name = n;
        amount = a;
        origin = o;
        destination = d;
      }
}
