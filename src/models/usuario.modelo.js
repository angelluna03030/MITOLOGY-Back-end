const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  numeroDeDocumento: {
    type: Number,
    required: true,
  },
  tipoDeDocumento: {
    type: String,
    enum: ["CC", "TI", "CE"], // Activo 1- InActivo 0
    required: true,
  },
  correo: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'],
  },
  numeroDeCelular: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  barrio: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
