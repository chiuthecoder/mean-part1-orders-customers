module.exports = function(app) {
	var users = require('../controllers/users.js');
  var products = require('../controllers/products.js');
  var orders = require('../controllers/orders.js');

  //===== user =====//
	// Index
  app.get('/users', function(request, response) {
    users.retrieve(request, response);
  });
  // Create
  app.post('/users', function(request, response) { 
  	users.create(request, response) 
  })
  // remove
  app.get('/users/:id', function (request, response){
    // console.log('app.post', req.params.id);
    // console.log('app.post', req.body.name);
    users.remove(request, response);
  })

  //===== product =====//
  // Index
  app.get('/products', function(request, response) {
    products.retrieve(request, response);
  });
  // Create
  app.post('/products', function(request, response) { 
    products.create(request, response) 
  })
  // remove
  app.get('/products/:id', function (request, response){
    products.remove(request, response);
  })

  //===== order =====//
  // Index
  app.get('/orders', function(request, response) {
    orders.retrieve(request, response);
  });
  // Create
  app.post('/orders', function(request, response) { 
    orders.create(request, response) 
  })
  // remove
  app.get('/orders/:id', function (request, response){
    orders.remove(request, response);
  })
};