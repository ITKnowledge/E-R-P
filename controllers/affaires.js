var express = require('express');
var Affaires = require('../models/affaire');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Affaires.find(function(err, affaires){
		res.render('affaires', {user: req.user, title: "Affaire", affaires: affaires});
	});
});


router.get('/add', isAuthenticated, function(req, res, next) {
		res.render('addaffaire', {user: req.user, title: "Affaire", affaires: null, mode:"add"});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var affaire = new Affaires();

	affaire.libelle = req.body.libelle;
	affaire.datedebut = req.body.datedebut;
	affaire.datefin = req.body.datefin;


	affaire.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/affaires');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Affaires.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/affaires');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Affaires.findById(req.params.id, function(err, affaire){
						res.render('editaffaire', {user: req.user, title: "Affaires", affaires: affaire, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Affaires.findById(req.params.id, function (err, affaires) {
					affaires.update({
										libelle: req.body.libelle,
										datedebut: req.body.datedebut,
										datefin: req.body.datefin
									},function (err, affairesID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/affaires');
													}else{
														res.redirect("/affaires");
													}
										})

					});

});






module.exports = router;
