var mongoose = require('mongoose');

module.exports = mongoose.model('Affaire',{
	libelle: String,
	datedebut: String,
	datefin: String
});

// - Libelle
// - Date de début
// - Date de fin
