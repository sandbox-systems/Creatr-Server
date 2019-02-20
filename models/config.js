const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const contentScehma = new Schema({
  landingContent: {
    type: 'String',
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('Content',  contentScehma); // instance of schemab   