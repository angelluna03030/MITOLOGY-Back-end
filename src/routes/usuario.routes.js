const { Router } = require("express");
const {
 obtenerUsuarios,crearUsuario
} = require("../controllers/usuario.controlador");
const middlewareUsuario = require("../middlewares/usuario.middleware");

const enrutador = Router();
// GET
enrutador.get("/usuarios", obtenerUsuarios);
// POST
enrutador.post("/usuarios", middlewareUsuario, crearUsuario);

module.exports = enrutador;
