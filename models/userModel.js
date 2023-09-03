const mongoose = require('mongoose');
const validator = require('validator');

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Correo electrónico no válido',
    },
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "defaultUser.png"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tercer parametro opcional, indica la colección
const User = mongoose.model('User', userSchema);

module.exports = User;
