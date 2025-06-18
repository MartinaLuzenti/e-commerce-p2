const express = require("express");
const router = express.Router();
const {
  listarProductos,
  crearProducto,
  validarProducto,
} = require("../controllers/productosController");

router.get("/", listarProductos);
router.post("/", validarProducto, crearProducto);

module.exports = router;
