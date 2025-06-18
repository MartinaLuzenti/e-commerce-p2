const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: { type: Number, required: true },
    },
  ],
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "cancelado"],
    default: "pendiente",
  },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
