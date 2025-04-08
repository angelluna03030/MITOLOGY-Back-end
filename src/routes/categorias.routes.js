const { Router } = require("express");
const {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  obtenerCategoriaPorId,
  traerTodasLasCategorias,
  cambiarEstadoCategoria,
} = require("../controllers/categoria.controlador");
const middlewareCategorias = require("../middlewares/categorias.middleware");

const enrutador = Router();

// GET
enrutador.get("/categorias", traerTodasLasCategorias);
enrutador.get("/categorias/:id", obtenerCategoriaPorId);

// POST
enrutador.post("/categorias", middlewareCategorias, crearCategoria);

// PUT
enrutador.put("/categorias/:id", middlewareCategorias, actualizarCategoria);
enrutador.put("/categorias/estado/:id", cambiarEstadoCategoria);

// DELETE
// enrutador.delete('/categorias/:id', eliminarCategoria);

module.exports = enrutador;
