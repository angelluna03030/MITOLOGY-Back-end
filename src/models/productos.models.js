const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    match: /^[A-Z0-9]+$/,
  },
  nombreproductos: {
    type: String,
    required: true,
  },
  estado: {
    type: Number,
    enum: [0, 1], //Activo 1- InActivo 0
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },

  tallas: {
    type: [String],
    required: true,
  },
  colores: {
    type: [String],
    required: true,
  },
  imagenes: {
    type: [String],
    required: true,
  },
  categorias: {
    type: [String],
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Producto = mongoose.model("Producto", productosSchema);

module.exports = Producto;
