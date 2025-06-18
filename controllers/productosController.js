const Producto = require("../models/producto");
const { body, validationResult } = require("express-validator");

const listarProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

const validarProducto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ max: 100 })
    .withMessage("Máximo 100 caracteres"),
  body("precio")
    .isFloat({ gt: 0 })
    .withMessage("Precio debe ser mayor a 0")
    .toFloat(),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock no puede ser negativo")
    .toInt(),
];
const crearProducto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error("Errores de validación", 400, errors.array());
  }
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.success(guardado, 201);
  } catch (err) {
    res.error(err.message, 400);
  }
};

module.exports = {
  listarProductos,
  crearProducto,
  validarProducto,
};
