require("dotenv").config();

// Configuración y validación de la API key
const API_KEY = process.env.API_KEY;

const apikeyMiddleware = (req, res, next) => {
  const providedKey = req.headers["x-api-key"];
  if (!providedKey || providedKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized - Invalid API Key" });
  }
  next();
};

// Verificar que no tenga caracteres especiales
const checkForSpecialCharacters = (req, res, next) => {
  const regex = /[<>!#$%^&*?"{}|=;]/;
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      if (regex.test(req.body[key])) {
        return res
          .status(400)
          .json({ error: "La cadena contiene caracteres especiales" });
      }
    }
  }
  next();
};

module.exports = {
  apikeyMiddleware,
  checkForSpecialCharacters,
};
