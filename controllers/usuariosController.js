
const Usuario = require('../models/usuario');


const registrarUsuario = async (req, res) => {
  const { username, email, contraseña } = req.body;

  try {
    const nuevoUsuario = new Usuario({ username, email, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

module.exports = { registrarUsuario };

