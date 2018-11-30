var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

//do get one
router.get('/items', function(req, res, next) {
  console.log("In Get Route");
  Item.find(function(err, items){
    if(err){ return next(err); }
    res.json(items);
  });
});

//do post one
router.post('/items', function(req, res, next) {
  console.log("In Post Route");
  console.log(req);
  var item = new Item(req.body);
  item.save(function(err, item){
    if(err){ return next(err); }
    console.log(item);
    res.json(item);
  });
});

router.param('item', function(req, res, next, id) {
  Item.findById(id, function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error("can't find comment")); }
    req.item = item;
    return next();
  });
});

router.get('/items/:item', function(req, res) {
  res.json(req.item);
});

router.put('/items/:item/upvote', function(req, res, next) {
  req.item.upvote(function(err, item){
    if (err) { return next(err); }
    res.json(item);
  });
});

//do delete
router.delete('/items/:item', function(req, res) {
  console.log("in Delete");
  console.log(req.candidate);
  req.item.remove();
  res.sendStatus(200);
});

module.exports = router;