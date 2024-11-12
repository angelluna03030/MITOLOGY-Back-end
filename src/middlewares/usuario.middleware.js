const estaVacio = (valor) => {
  return !valor || (typeof valor === "string" && valor.trim().length === 0);
};

const esCorreoValido = (correo) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
const soloLetras = (valor) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor); // Permitir espacios en nombres y apellidos
const esNumeroDeCelularValido = (numero) => /^[0-9]{10}$/.test(numero);
const esDocumentoValido = (numero) => /^[0-9]{5,15}$/.test(numero);

const middlewareUsuario = (req, res, next) => {
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


  // Validación de nombres
  if (estaVacio(nombres) || !soloLetras(nombres) || nombres.length < 2 || nombres.length > 50) {
    return res.status(400).json({
      mensaje: "El campo 'nombres' debe contener solo letras y tener entre 2 y 50 caracteres.",
    });
  }

  // Validación de apellidos
  if (estaVacio(apellidos) || !soloLetras(apellidos) || apellidos.length < 2 || apellidos.length > 30) {
    return res.status(400).json({
      mensaje: "El campo 'apellidos' debe contener solo letras y tener entre 2 y 30 caracteres.",
    });
  }

  // Validación del número de documento
  if (estaVacio(numeroDeDocumento) || !esDocumentoValido(numeroDeDocumento)) {
    return res.status(400).json({
      mensaje: "El campo 'número de documento' debe ser un número de entre 5 y 15 dígitos.",
    });
  }

  // Validación del tipo de documento
  if (estaVacio(tipoDeDocumento)) {
    return res.status(400).json({ mensaje: "El campo 'tipo de documento' no puede estar vacío." });
  }

  // Validación del correo electrónico
  if (estaVacio(correo) || !esCorreoValido(correo)) {
    return res.status(400).json({
      mensaje: "El campo 'correo' debe ser un correo electrónico válido.",
    });
  }

  // Validación del número de celular
  if (estaVacio(numeroDeCelular) || !esNumeroDeCelularValido(numeroDeCelular)) {
    return res.status(400).json({
      mensaje: "El campo 'número de celular' debe contener exactamente 10 dígitos.",
    });
  }

  // Validación de dirección
  if (estaVacio(direccion)) {
    return res.status(400).json({ mensaje: "El campo 'dirección' no puede estar vacío." });
  }

  // Validación de barrio
  if (estaVacio(barrio)) {
    return res.status(400).json({ mensaje: "El campo 'barrio' no puede estar vacío." });
  }

  // Validación de ciudad
  if (estaVacio(ciudad)) {
    return res.status(400).json({ mensaje: "El campo 'ciudad' no puede estar vacío." });
  }

  // Validación de departamento
  if (estaVacio(departamento)) {
    return res.status(400).json({ mensaje: "El campo 'departamento' no puede estar vacío." });
  }

  next(); // Continuar si todas las validaciones pasan
};

module.exports = middlewareUsuario;
