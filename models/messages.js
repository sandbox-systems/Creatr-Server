const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const contentScehma = new Schema({
  message: {
    type: 'String',
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  date: {
    type: 'Date',
    default: new Date().toISOString(),
    required: true,
  },
});

module.exports = mongoose.model('Messages',  contentScehma); // instance of schema