const express = require("express");
const router = express.Router();
const { registrarUsuario, listarUsuarios,login } = require("../controllers/usuariosController");

router.post("/", registrarUsuario);
router.get("/",listarUsuarios);
router.post("/login",login);

module.exports = router;



