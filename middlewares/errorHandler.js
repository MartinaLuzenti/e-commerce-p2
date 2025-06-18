const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);
  if (err.name === "ValidationError") {
    return res.error("Datos inválidos", 400, err.errors);
  }
  if (err.code === 11000) {
    return res.error("El producto ya existe", 409);
  }
  res.error("Error interno del servidor", 500);
};

module.exports = errorHandler;
