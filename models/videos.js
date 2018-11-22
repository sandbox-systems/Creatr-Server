const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const videoScehma = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true,
  },
  vid: {
    type: 'String',
    required: true,
    trim: true
  },
//   date: {
//     type: 'Date',
//     required: true,
//   },
  tags: {
    type: 'Array'
  },
  state: {
      type:'String'
  }
});

// // encrypt password before save
// userSchema.pre('save', function(next) {
//   const user = this;
//   if(!user.isModified || !user.isNew) {
//     next();
//   } else {
//     bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
//       if (err) {
//         console.log('Error hashing password for user', user.name);
//         next(err);
//       } else {
//         user.password = hash;
//         next();
//       }
//     });
//   }
// });

module.exports = mongoose.model('Video', videoScehma); // instance of schema