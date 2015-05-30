var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  product: { type: String, trim: true },
  quantity: { type: Number },
  created: { type: Date, default: Date.now }
});

mongoose.model('Order', OrderSchema);
// ProductSchema.path('name').required(true, "Name field is required");