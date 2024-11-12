const Usuario = require("../models/usuario.modelo");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (e) {
    console.error("Error al obtener los usuarios:", e);
    res.status(500).json({ error: e.message });
  }
};

const crearUsuario = async (req, res) => {
  const {
    nombres,
    apellidos,
    numeroDeDocumento,
    tipoDeDocumento,
    correo,
    numeroDeCelular,
    direccion,
    barrio,
    ciudad,
    departamento,
  } = req.body;

  try {
    const usuario = new Usuario({
      nombres,
      apellidos,
      numeroDeDocumento,
      tipoDeDocumento,
      correo,
      numeroDeCelular,
      direccion,
      barrio,
      ciudad,
      departamento,
    });
    
    const data = await usuario.save();
    res.status(201).json(data);
  } catch (e) {
    console.error("Error al crear el usuario:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
};
