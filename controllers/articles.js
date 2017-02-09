var express = require('express');
var Articles = require('../models/article');
var Familles = require('../models/famille');
var Sousfamilles = require('../models/sousfamille');
var router = express.Router();



var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Articles.find(function(err, articles){
		res.render('articles', {user: req.user, title: "Article", articles: articles});
	});
});


router.get('/add', isAuthenticated, function(req, res, next) {
	Familles.find(function(err, familles){
		Sousfamilles.find(function(err, sousfamilles){
			res.render('addarticle', {user: req.user, title: "Article", familles: familles, sousfamilles: sousfamilles,articles: null, mode:"add"});
		})
	})

});

router.post('/add', isAuthenticated, function(req, res, next){
	var article = new Articles();

	article.code = req.body.code;
	article.designation = req.body.designation;
	article.prixunite = req.body.prixunite;
	article.famille = req.body.famille.split("|")[0];
	article.sousfamille = req.body.sousfamille.split("|")[2];
	article.type = req.body.type;
	article.tva = req.body.tva;


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
				res.render('editclient', {user: req.user, title: "Articles", articles: article, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Articles.findById(req.params.id, function (err, articles) {
					articles.update({
										code: req.body.code,
										raisonsocial: req.body.raisonsocial,
										phone: req.body.phone,
										address: req.body.address,
										email: req.body.email
									},function (err, articlesID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/articles');
													}else{
														res.redirect("/articles/edit/" + articles._id);
													}
										})

					});

});






module.exports = router;
