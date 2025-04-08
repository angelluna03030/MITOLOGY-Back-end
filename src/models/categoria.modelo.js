const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]{5,15}$/,
  },
  imagen: {
    type: String,
    required: true,
  },
  estado: {
    type: Number,
    enum: [0, 1], //Activo 1- InActivo 0
    required: true,
  },
  descripcion: { 
    type: String, 
    required: true, 
    match: /^[A-Za-z0-9\sáéíóúÁÉÍÓÚñÑ.,!]+$/
},


  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;
