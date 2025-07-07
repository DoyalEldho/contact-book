const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
      match: [/^\S+@\S+\.\S{2,}$/, 'Please enter a valid email address'] //checking valid email format
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Contact', contactSchema);
