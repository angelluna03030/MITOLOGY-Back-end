const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dryyuf1vh",
  api_key: "396137648489188",
  api_secret: "2jyMTLlD1AcnZYSjLUrrlmC738I",
});

// Configuración de multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cambia el nombre de la carpeta según tu preferencia
    allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4", "mov"],
    transformation: [{ 
      quality: "auto:good", // Ajusta la calidad automáticamente para mantener un buen equilibrio entre calidad y tamaño
      fetch_format: "auto" // Permite que Cloudinary decida el formato más adecuado
    }],
  },
});

const upload = multer({ storage: storage });

// Middleware para parsear el body de las solicitudes
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Ruta para la carga de múltiples archivos
app.post("/public", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ error: "No se han subido archivos" });
  }

  const fileUrls = req.files.map(file => file.path); // URL de las imágenes/videos en Cloudinary
  res.status(200).send({
    data: "Archivos cargados correctamente",
    files: fileUrls,
  });
});

// Ruta para la carga de múltiples videos (se usa el mismo endpoint)
app.post("/public/videos", upload.array("videos", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ error: "No se han subido archivos" });
  }

  const fileUrls = req.files.map(file => file.path); // URL de los videos en Cloudinary
  res.status(200).send({
    data: "Videos cargados correctamente",
    files: fileUrls,
  });
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((e) => console.error(`Error al conectar a MongoDB: ${e}`));

// Aplicar middlewares
app.use("/api", require("./middlewares/general.middleware").apikeyMiddleware);
app.use("/api", require("./routes/productos.routes"));
app.use("/api", require("./routes/categorias.routes"));
app.use("/api", require("./routes/catalogo.routes"));
app.use("/api", require("./routes/usuario.routes"));

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API!");
});

module.exports = app;
