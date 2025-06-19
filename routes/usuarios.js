const express = require("express");
const router = express.Router();
const { registrarUsuario, listarUsuarios } = require("../controllers/usuariosController");

router.post("/", registrarUsuario);
router.get("/",listarUsuarios);

module.exports = router;



