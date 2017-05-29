var express = require('express');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}


var core = require('../libs/core.js');
var Core = new core();


// console.log(Core.get());
// console.log(Core.set());
// console.log("la version est : " + Core.getver());

// console.log(Core.getClients());
// console.log(Core.getClients());
// console.log(Core.getClients());



/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  var clients = Core.getClients();
  var tera = "terra mia";
  console.log(tera);
  res.render('mylibs', {user: req.user, tera: tera, clients: clients});
  //res.send("OK OK");

  //res.render('lib', {title: 'lib', clients: "clients"});
});

module.exports = router;
