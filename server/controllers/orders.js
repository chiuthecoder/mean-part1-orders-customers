var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function() {
  return {
    retrieve: function(request, response){      
      Order.find({}, function(err, orders){
        response.json(orders);
        // console.log(orders);
      });
    },
    create: function(request, response){ 
      var order = new Order({name: request.body.name, product: request.body.product, quantity: request.body.quantity});    
      order.save(function(err, record){
        if(err){
          response.json({status: 'failed', err: err})
        }
        else{
          response.json({status: 'success'})
        }
      })
    },
    remove: function(request, response){   
      Order.remove({_id: request.params.id}, function (err){
        if(err) {
          console.log(err);
        } else { // else console.log that we did well and then redirect to the root route
          // console.log('successfully added a order!');
          response.json({status: 'success'})
          // res.render('result', {orders: orders_array});
        }
      })
    }
  }
})();
