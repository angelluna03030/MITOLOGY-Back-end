const mongoose = require("mongoose");

const catalogoSchema = new mongoose.Schema({
  imagenesparavideo: {
    type: [String],
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  imagenesparagaleria: {
    type: [String],
    required: true,
  },
  productosdestacados: {
    type: [String],
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagendescripcion: {
    type: String,
    required: true,
  },
  titulodescripcion: {
    type:
      String, required:
      true,
  },
});

const Catalogo = mongoose.model("Catalogo", catalogoSchema);

module.exports = Catalogo;
