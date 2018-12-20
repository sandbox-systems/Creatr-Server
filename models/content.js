const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const contentScehma = new Schema({
  title: {
    type: 'String',
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  description: {
    type: 'String',
    trim: true,
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
  tags: {
    type: 'Array'
  },
  data: {
    type: 'String',
  },
  state: {
    type: 'String',
    default: 'published',
    required: true
  }
});

module.exports = mongoose.model('Content',  contentScehma); // instance of schema