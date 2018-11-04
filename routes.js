const routes = require('next-routes')();

routes
  .add('/new', '/new')
  .add('/Shippings/:address', '/Shippings/show')
  .add('/Shippings/:address/new', '/Shippings/new')
  .add('/Shippings/:address/:shippaddress', 'Shippings/Attributes/show');


module.exports = routes;
