const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  }, 
  password: {
    type: 'String',
    required: true,
    trim: true,
    select: false
  },
  firstname: {
    type: 'String',
    required: true,
    trim: true,
  },
  lastname: {
    type: 'String',
    required: true,
    trim: true,
  },
  role: {
    type: 'String',
    required: 'true',
    default: 'student'
  },
  section: {
    type: Array,
    required: 'false',
    default: ["Free"]
  },
  
});

// encrypt password before save
userSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('User', userSchema); // instance of schema