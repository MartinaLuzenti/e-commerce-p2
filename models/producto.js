 const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    descripcion: { type: String },
    imagen: {
      data: Buffer,
      contentType: String,
    },
  },
  { collection: "productos" }
);

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
