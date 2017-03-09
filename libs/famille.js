'use strict';


var Famille = function(){

this.code;
this.nom;
this.observation;
this.rr;

};

Famille.prototype.getCode = function () {
  return this.code;
};

Famille.prototype.setCode = function (code) {
  this.code = code;
};

Famille.prototype.getNom = function () {
  return this.nom;
};

Famille.prototype.setNom = function (nom) {
  this.nom = nom;
};

Famille.prototype.setRr = function (tmp) {
  this.rr = tmp;
};

Famille.prototype.getObservation = function () {
  return this.observation;
};

Famille.prototype.setNom = function (observation) {
  this.observation = observation;
};

Famille.prototype.getRec = function (rec, nom) {
  var query = rec.find({famille:nom});
  return query;
};

Famille.prototype.updsousfamille = function(rec, oldfamille, newfamille){
  rec.update({famille: oldfamille},
    { famille: newfamille },{ multi: true },
    function(err, data){
    if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        }
        else {
        console.log("UPDATE DES SOUS FAMILLES REUSSI");
        }
  });
};


module.exports = Famille;
