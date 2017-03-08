var express = require('express');
var Articles = require('../models/article');
var Familles = require('../models/famille');
var Sousfamilles = require('../models/sousfamille');
var Tva = require('../models/tva');

var router = express.Router();



var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Articles.find(function(err, articles){
    Tva.find(function(err, tvas){
			res.render('articles', {user: req.user, title: "Article", articles: articles, tva: tvas});
		});
	});
});


router.get('/add', isAuthenticated, function(req, res, next) {
	Familles.find(function(err, familles){
		Sousfamilles.find(function(err, sousfamilles){
			Tva.find(function(err, tvas){
			res.render('addarticle', {user: req.user, tva: tvas, title: "Article", familles: familles, sousfamilles: sousfamilles,articles: null, mode:"add"});
			});
		});
	});

});

router.post('/add', isAuthenticated, function(req, res, next){
	var article = new Articles();

	article.code = req.body.code;
	article.designation = req.body.designation;
	article.prixunite = req.body.prixunite;
	article.famille = req.body.famille.split("|")[0];
	article.sousfamille = req.body.sousfamille.split("|")[2];
	article.type = req.body.type;
	article.tva = req.body.tva.split("|")[1];


	article.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/articles');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Articles.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/articles');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Articles.findById(req.params.id, function(err, article){
				var familleactuelle = article.famille;
				var sousfamilleactuelle = article.sousfamille;
				var acttype = article.type;
				Familles.find(function(err, familles){
					Sousfamilles.find(function(err, sousfamilles){
						res.render('editarticle', {user: req.user, title: "Articles", acttype: acttype, actfamille: familleactuelle, actsousfamille: sousfamilleactuelle, familles: familles, sousfamilles: sousfamilles, articles: article, mode:"edit"});
					})

				})

			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Articles.findById(req.params.id, function (err, articles) {
					articles.update({
										code: req.body.code,
										designation: req.body.designation,
										type: req.body.type,
										famille: req.body.famille.split("|")[0],
										sousfamille: req.body.sousfamille.split("|")[2],
										tva: req.body.tva
									},function (err, articlesID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/articles');
													}else{
														res.redirect("/articles");
													}
										})

					});

});






module.exports = router;
