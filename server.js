var express = require('express');
var jade = require('jade');
var app = express();

app.use('/assets', express.static('assets'));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('start');
});

app.get('/edit-scorecard', function(req, res){
  var title = req.query.title;
  res.render('edit-scorecard', { title: req.query.title, new: false})
});

app.get('/new-scorecard', function(req, res){
  res.render('edit-scorecard', {new: true})
});

app.get('/new-outcome', function(req, res){
  res.render('new-outcome');
});

app.get('/edit-outcome', function(req, res){
  res.render('new-outcome');
});

app.get('/business-outcome', function(req, res){
  res.render('business-outcome');
});


app.listen('8080', function () {
  //console.log('Example app listening on port 3121!');
});