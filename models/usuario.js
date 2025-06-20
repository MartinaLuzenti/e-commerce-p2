const mongoose = require("mongoose");
const crypto = require("crypto");

const UsuariosSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 
   contraseña: {
    type: String,
    required: true,
  },
  
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
    required: true,
  },
  salt: {
    type: String,
    required: false,
  }
});
function hashPassword(password, salt) {
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return hash;
}

UsuariosSchema.pre('save', function (next) {
  if (!this.isModified('contraseña')) return next();

  this.salt = crypto.randomBytes(16).toString('hex');
  this.contraseña = crypto
    .createHmac('sha256', this.salt)
    .update(this.contraseña)
    .digest('hex');

  next();
});



module.exports = mongoose.model('Usuario', UsuariosSchema);
