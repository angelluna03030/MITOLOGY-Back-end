require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión a la base de datos de MongoDB Atlas."))
  .catch((e) => console.error(`Error: ${e}`));
