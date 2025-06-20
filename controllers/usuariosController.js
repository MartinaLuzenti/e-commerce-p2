const Usuario = require("../models/usuario");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
  const { username, email, contraseña } = req.body;

  try {
    const nuevoUsuario = new Usuario({ username, email, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
const login = async (req, res) => {
  const { username, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no existente" });
    }
    // Usa el método del modelo para validar la contraseña
    const esValida = usuario.esContraseñaValida(contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }
    // Generar el token JWT
    const token = generarToken(usuario);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

function generarToken(usuario) {
  // Datos del usuario que se codificarán en el token
  const payload = {
    sub: usuario.id, // Identificador único del usuario
    username: usuario.username, // Nombre de usuario
    rol: usuario.rol, // Rol del usuario, ej: 'admin', 'usuario', etc.
  };
  // Clave secreta utilizada para firmar el token (mantenerla segura)
  const secret = "mi_clave_secreta";
  // Opciones adicionales: Por ejemplo, caducidad del token
  const opciones = {
    expiresIn: "1h", // El token expirará después de 1 hora
  };
  // Firmar el token con el payload, la clave secreta y las opciones
  const token = jwt.sign(payload, secret, opciones);
  return token;
}
module.exports = { registrarUsuario, listarUsuarios, login };
