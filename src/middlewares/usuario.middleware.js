const estaVacio = (valor) => {
  return !valor || (typeof valor === "string" && valor.trim().length === 0);
};

const soloLetras = (valor) => /^[A-Za-z\s]{2,30}$/.test(valor);

const esCorreoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

const esNumeroDeCelularValido = (numero) => /^[0-9]{10}$/.test(numero);

const esDocumentoValido = (numero) => /^[0-9]{5,15}$/.test(numero);

const middlewareUsuario = (req, res, next) => {
  const {
    nombre,
    apellido,
    numeroDeDocumento,
    tipoDeDocumento,
    correo,
    numeroDeCelular,
    direccion,
    barrio,
    ciudad,
    departamento,
  } = req.body;

  // Validación del nombre y apellido
  if (estaVacio(nombre) || !soloLetras(nombre)) {
    return res.status(400).json({
      mensaje: "El nombre debe contener solo letras y tener entre 2 y 30 caracteres.",
    });
  }

  if (estaVacio(apellido) || !soloLetras(apellido)) {
    return res.status(400).json({
      mensaje: "El apellido debe contener solo letras y tener entre 2 y 30 caracteres.",
    });
  }

  // Validación del número de documento
  if (estaVacio(numeroDeDocumento) || !esDocumentoValido(numeroDeDocumento)) {
    return res.status(400).json({
      mensaje: "El número de documento debe ser un número de entre 5 y 15 dígitos.",
    });
  }

  // Validación del correo electrónico
  if (estaVacio(correo) || !esCorreoValido(correo)) {
    return res.status(400).json({
      mensaje: "El correo debe ser un correo electrónico válido.",
    });
  }

  // Validación del número de celular
  if (estaVacio(numeroDeCelular) || !esNumeroDeCelularValido(numeroDeCelular)) {
    return res.status(400).json({
      mensaje: "El número de celular debe contener exactamente 10 dígitos.",
    });
  }

  // Validación de dirección, barrio, ciudad y departamento
  if (estaVacio(direccion)) {
    return res.status(400).json({ mensaje: "La dirección no puede estar vacía." });
  }

  if (estaVacio(barrio)) {
    return res.status(400).json({ mensaje: "El barrio no puede estar vacío." });
  }

  if (estaVacio(ciudad)) {
    return res.status(400).json({ mensaje: "La ciudad no puede estar vacía." });
  }

  if (estaVacio(departamento)) {
    return res.status(400).json({ mensaje: "El departamento no puede estar vacío." });
  }

  next();
};

module.exports = middlewareUsuario;
