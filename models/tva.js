var mongoose = require('mongoose');

module.exports = mongoose.model('Tva',{
	code: String,
	designation: String,
	tva: Number
});
