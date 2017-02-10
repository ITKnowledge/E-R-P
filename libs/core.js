'use strict';
var Clients = require('../models/client');




var Core = function(){
  this.version = "0.1";
  this.clients;
  // console.log("test c'est moi HiHi");
};

Core.prototype.get = function () {
    var msg = "c'est la methode get";
    return msg;
};

Core.prototype.getver = function () {
  return this.version;
};

Core.prototype.getClients = function () {
  var clts;
  Clients.find(function(err, clients){
  // console.log(clients);
	clts = clients;
	});
  // console.log(clts);
  this.setClients(clts);
  return this.clients;
};

Core.prototype.set = function () {
    var msg = "c'est la methode set";
    return msg;
};

Core.prototype.setClients = function (clients) {
    this.clients = clients;
};







module.exports = Core;
