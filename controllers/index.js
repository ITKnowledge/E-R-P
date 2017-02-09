var express = require('express');
var router = express.Router();

var core = require('./core.js');
var Core = new core();


console.log(Core.get());
console.log(Core.set());
console.log("la version est : " + Core.getver());

console.log(Core.getClients());
console.log(Core.getClients());
console.log(Core.getClients());



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

module.exports = router;
