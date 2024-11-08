const { Router } = require("express");
const {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  buscarProductos,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  cambiarEstadoProducto,
  obtenerProductosPorIds,
} = require("../controllers/productos.controlador");
const middlewareProductos = require("../middlewares/productos.middleware");
const enrutador = Router();
// GET
enrutador.get("/productos", obtenerProductos);
enrutador.get("/productos/:id", obtenerProductoPorId);
enrutador.get("/productos/categorias/:categoria", obtenerProductosPorCategoria);
enrutador.get("/productos/buscar/:query", buscarProductos);

// POST
enrutador.post("/productos", middlewareProductos, crearProducto);
// Un POST especial ya que este trae los productos por un Array de Ids
enrutador.post("/productos/ids", obtenerProductosPorIds);

// PUT
enrutador.put("/productos/:id", middlewareProductos, actualizarProducto);
enrutador.put("/productos/estado/:id", cambiarEstadoProducto);
// DELETE

//enrutador.delete("/productos/:id", eliminarProducto);

module.exports = enrutador;
