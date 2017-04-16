var express = require('express');
var Devis = require('../models/devis');
var Fournisseur = require('../models/fournisseur');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Devis.find(function(err, devis){
		res.render('devis', {user: req.user, title: "Devis", devis: devis});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
  Fournisseur.find(function(err, fournisseurs){
    res.render('adddevis', {user: req.user, title: "Devis", fournisseurs: fournisseurs, devis: null, mode:"add"});
  });

});

router.post('/add', isAuthenticated, function(req, res, next){
	var devis = new Devis();
	
	devis.nature = req.body.nature;
	devis.numero = req.body.numero;
	devis.datecreation = req.body.datecreation;
	devis.prixtotal = req.body.prixtotal;
  devis.fournisseur = req.body.fournisseur.split("|")[0];


	devis.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/devis');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Devis.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/devis');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){

			Devis.findById(req.params.id, function(err, devis){
        var actfournisseur = devis.fournisseur;
        Fournisseur.find(function(err, fournisseurs){
          res.render('editdevis', {user: req.user, title: "Devis", fournisseurs: fournisseurs, actfournisseur: actfournisseur, devis: devis, mode:"edit"});
        });
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Devis.findById(req.params.id, function (err, devis) {
					devis.update({
										nature: req.body.nature,
										numero: req.body.numero,
										datecreation: req.body.datecreation,
                    prixtotal: req.body.prixtotal,
										fournisseur: req.body.fournisseur.split("|")[0]
									},function (err, devisID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/devis');
													}else{
														res.redirect("/devis/edit/" + devis._id);
													}
										})

					});

});






module.exports = router;
