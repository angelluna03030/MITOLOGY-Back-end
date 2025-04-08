const estaVacio = (valor) => {
  return !valor || valor.trim().length === 0;
};

const soloLetras = (valor) => {
  // Permite solo letras y espacios
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(valor);
};

const middlewareCategorias = (req, res, next) => {
  const { nombre, descripcion, imagen } = req.body;

  // Validación de campos vacíos
  if (estaVacio(nombre) || estaVacio(descripcion)) {
    return res.status(400).json({ mensaje: "No se aceptan datos vacíos." });
  }
  console.log("Nombre:", nombre);
  console.log("Descripción:", descripcion);
  console.log("Imagen:", imagen);
  // Validación del nombre
  if (!soloLetras(nombre) || nombre.length < 5 || nombre.length > 15) {
    return res.status(400).json({
      mensaje:
        "El nombre debe contener entre 5 y 15 letras y solo puede contener letras y espacios.",
    });
  }

  // Validación de la descripción
  if (descripcion.length < 15 || descripcion.length > 100) {
    return res
      .status(400)
      .json({ mensaje: "La descripción debe tener entre 15 y 100 caracteres." });
  }

  // Validación de la imagen
  if (estaVacio(imagen)) {
    return res.status(400).json({ mensaje: "Se debe seleccionar una imagen." });
  }

  next();
};

module.exports = middlewareCategorias;
