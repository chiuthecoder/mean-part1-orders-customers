var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
  return {
    retrieve: function(request, response){      
      User.find({}, function(err, users){
        response.json(users);
        // console.log(users);
      });
    },
    create: function(request, response){ 
      var user = new User({name: request.body.name});    
      user.save(function(err, record){
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
      User.remove({_id: request.params.id}, function (err){
        if(err) {
          console.log(err);
        } else { // else console.log that we did well and then redirect to the root route
          // console.log('successfully added a user!');
          response.json({status: 'success'})
          // res.render('result', {users: users_array});
        }
      })
    }
  }
})();
