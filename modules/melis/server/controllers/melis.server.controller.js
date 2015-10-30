'use strict';

/**
* Module dependencies.
*/
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  Meli = mongoose.model('Meli'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a Meli
*/
exports.create = function(req, res) {
  var meli = new Meli(req.body);
  meli.user = req.user;

  meli.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meli);
    }
  });
};

/**
* Show the current Meli
*/
exports.read = function(req, res) {
  res.jsonp(req.meli);
};

/**
* Update a Meli
*/
exports.update = function(req, res) {
  var meli = req.meli ;

  meli = _.extend(meli , req.body);

  meli.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meli);
    }
  });
};

/**
* Delete an Meli
*/
exports.delete = function(req, res) {
  var meli = req.meli ;

  meli.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meli);
    }
  });
};

/**
* List of Melis
*/
exports.list = function(req, res) { Meli.find().sort('-created').populate('user', 'displayName').exec(function(err, melis) {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.jsonp(melis);
  }
});
};

/**
* Meli middleware
*/
exports.meliByID = function(req, res, next, id) { Meli.findById(id).populate('user', 'displayName').exec(function(err, meli) {
  if (err) return next(err);
  if (! meli) return next(new Error('Failed to load Meli ' + id));
  req.meli = meli ;
  next();
});
};