var mongoose = require('mongoose');

module.exports = mongoose.model('Devis',{
	nature: String,
	numero: String,
	datecreation: String,
  datelivraisonprevu: String,
  prixtotal: Number,
  numerodevisfournisseur: String,
  fournisseur: String
});




// - Nature du document (Devis)
// - N°
// - Date de création
// - Prix total
// - Fournisseur
// - Numero devis fournisseur
// - Date livraison prevu
