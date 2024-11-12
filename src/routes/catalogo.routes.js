const { Router } = require("express");
const {
  traerTodaLaInformacionDelCatalogo,
  crearCatalogo,
  actualizarImagenesParaGaleria,
  actualizarImagenesParaVideo,
  actualizarProductosDestacados,
  actualizarVideo,
  actualizarDescripcion
} = require("../controllers/catalogo.controlador");

const enrutador = Router();

// GET
enrutador.get("/catalogo", traerTodaLaInformacionDelCatalogo);

// POST
enrutador.post("/catalogo", crearCatalogo);

// PUT
enrutador.put("/catalogo/imagenesparavideo", actualizarImagenesParaVideo);
enrutador.put("/catalogo/video", actualizarVideo);
enrutador.put("/catalogo/imagenesparagaleria", actualizarImagenesParaGaleria);
enrutador.put("/catalogo/productosdestacados", actualizarProductosDestacados);
enrutador.put("/catalogo/descripcion", actualizarDescripcion);

module.exports = enrutador;
