const Pedido = require("../models/Pedido");
const Producto = require("../models/producto");

exports.crearPedido = async (req, res) => {
  try {
    const { productos } = req.body;

    for (let item of productos) {
      const productoDB = await Producto.findById(item.producto);
      if (!productoDB || productoDB.stock < item.cantidad) {
        return res
          .status(400)
          .json({ error: "Stock insuficiente o producto no existe." });
      }
      productoDB.stock -= item.cantidad;
      await productoDB.save();
    }

    const pedido = new Pedido({
      usuario: req.usuario._id,
      productos,
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.historialUsuario = async (req, res) => {
  const pedidos = await Pedido.find({ usuario: req.usuario._id }).populate(
    "productos.producto"
  );
  res.json(pedidos);
};

exports.todosLosPedidos = async (req, res) => {
  const pedidos = await Pedido.find()
    .populate("usuario")
    .populate("productos.producto");
  res.json(pedidos);
};

exports.actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const pedido = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });
  res.json(pedido);
};
