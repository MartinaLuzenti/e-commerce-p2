const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/db");
const productosRoutes = require("./routes/productos");
const usuariosRoutes = require("./routes/usuarios");
const responseHandler = require("./middlewares/responseHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(responseHandler);

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

module.exports = app;

