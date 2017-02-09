var mongoose = require('mongoose');

module.exports = mongoose.model('Article',{
	code: String,
	designation: String,
	type: String,
	prixunite: String,
  famille: String,
	sousfamille: String,
	tva: Number
});

// - Code
// - Designation
// - Type (Matière premier (MP) ou produit fini (PF))
// - Prix unitaire
// - Famille
// - Sous famille
// - TVA (7, 14 ou 20%)
