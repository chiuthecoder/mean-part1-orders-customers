var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function() {
  return {
    retrieve: function(request, response){      
      Product.find({}, function(err, products){
        response.json(products);
        // console.log(products);
      });
    },
    create: function(request, response){ 
      var product = new Product({name: request.body.name, description: request.body.description, quantity: request.body.quantity, image: request.body.image});    
      product.save(function(err, record){
        if(err){
          response.json({status: 'failed', err: err})
        }
        else{
          response.json({status: 'success'})
        }
        // console.log('@@@@@', err);
        // console.log('6666', record)
      })
    },
    remove: function(request, response){   
      Product.remove({_id: request.params.id}, function (err){
        if(err) {
          console.log(err);
        } else { // else console.log that we did well and then redirect to the root route
          // console.log('successfully added a user!');
          response.json({status: 'success'})
          // res.render('result', {products: users_array});
        }
      })
    }
  }
})();
