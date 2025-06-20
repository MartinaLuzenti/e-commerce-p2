const Usuario = require("../models/usuario");
const crypto = require("crypto");

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

    // Verificar la contraseña
    if(esContraseñaValida(contraseña, usuario.salt,usuario.password) === false) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario });

  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

function esContraseñaValida(passwordIngresado, salt,passwordAlmacenada) {
  const passwordCifrada = crypto.createHmac("sha256", salt).update(passwordIngresado).digest("hex");
  // Aquí deberías comparar la contraseña cifrada con la almacenada en la base de datos
  if(passwordCifrada===passwordAlmacenada) {
    return true;
  } else {
    return false;
  }
}

module.exports = { registrarUsuario, listarUsuarios, login };
