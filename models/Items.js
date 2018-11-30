//initializing schema... for item whic contains
//name
//upvotes
//price
//imageurl
var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
  info:{type: String, default: "No information"},
  url: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}
});

ItemSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Item', ItemSchema);