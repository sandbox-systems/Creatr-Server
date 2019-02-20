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
  description: {
    type: 'String',
    trim: true,
  },
  vid: {
    type: 'String',
  },
  chatid: {
    type: 'String',
  },
  date: {
    type: 'Date',
    required: true,
  },
  tags: {
    type: 'Array'
  },
  state: {
      type:'String',
      default: 'scheduled'
  },
  section: {
    type: Array,
    required: 'true',
    default: ["Free"]
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