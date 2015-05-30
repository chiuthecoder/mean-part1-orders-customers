var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  quantity: Number,
  // image: { data: Buffer, contentType: String },
  created: { type: Date, default: Date.now }
  // updated_at: { type: Date, default: Date.now },
});

mongoose.model('Product', ProductSchema);
// ProductSchema.path('name').required(true, "Name field is required");