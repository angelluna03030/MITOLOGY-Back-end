const Catalogo = require("../models/catalogo.modelo");

const traerTodaLaInformacionDelCatalogo = async (req, res) => {
  try {
    const catalogo = await Catalogo.find();
    res.status(200).json(catalogo);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};const crearCatalogo = async (req, res) => {
  console.log("Creando catálogo...");
  const { imagenesparavideo, video, imagenesparagaleria, productosdestacados, descripcion, imagendescripcion, titulodescripcion } = req.body;

  try {
    // Verificar si ya existe un catálogo
    const existeCatalogo = await Catalogo.findOne();
    if (existeCatalogo) {
      return res
        .status(400)
        .json({ message: "Ya existe un catálogo. Solo se permite uno." });
    }

    // Crear el nuevo catálogo con los campos necesarios
    const nuevoCatalogo = new Catalogo({
      imagenesparavideo,
      video,
      imagenesparagaleria,
      productosdestacados,
      descripcion,
      imagendescripcion,
      titulodescripcion,
    });

    // Guardar el catálogo en la base de datos
    await nuevoCatalogo.save();
    res.status(201).json(nuevoCatalogo);
  } catch (e) {
    console.error(`Error al crear el catálogo: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

const actualizarImagenesParaVideo = async (req, res) => {
  const { imagenesparavideo } = req.body;

  try {
    const catalogoActualizado = await Catalogo.findOneAndUpdate(
      {},
      { imagenesparavideo },
      { new: true }
    );

    if (!catalogoActualizado) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún catálogo." });
    }

    res.status(200).json(catalogoActualizado);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

const actualizarVideo = async (req, res) => {
  const { video } = req.body;

  try {
    const catalogoActualizado = await Catalogo.findOneAndUpdate(
      {},
      { video },
      { new: true }
    );

    if (!catalogoActualizado) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún catálogo." });
    }

    res.status(200).json(catalogoActualizado);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

const actualizarImagenesParaGaleria = async (req, res) => {
  const { imagenesparagaleria } = req.body;

  try {
    const catalogoActualizado = await Catalogo.findOneAndUpdate(
      {},
      { imagenesparagaleria },
      { new: true }
    );

    if (!catalogoActualizado) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún catálogo." });
    }

    res.status(200).json(catalogoActualizado);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

const actualizarProductosDestacados = async (req, res) => {
  const { productosdestacados } = req.body;

  try {
    // Encuentra el catálogo existente
    const catalogo = await Catalogo.findOne({});

    if (!catalogo) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún catálogo." });
    }

    // Elimina la información actual de productosdestacados
    catalogo.productosdestacados = [];

    // Agrega la nueva información de productosdestacados desde el body
    catalogo.productosdestacados = productosdestacados;

    // Guarda los cambios en la base de datos
    const catalogoActualizado = await catalogo.save();

    res.status(200).json(catalogoActualizado);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};
const actualizarDescripcion = async (req, res) => {
  const { descripcion, imagendescripcion, titulodescripcion  } = req.body;
  console.log("aqui los datos " +descripcion)
  try { // Encuentra el catálogo existente
    const catalogo = await Catalogo.findOne({});
     if (!catalogo) { return res.status(404).json({ message: "No se encontró ningún catálogo." }); } // Actualiza la descripción, imagen de descripción y título de descripción 
    catalogo.descripcion = descripcion; 
    catalogo.imagendescripcion = imagendescripcion; 
    catalogo.titulodescripcion = titulodescripcion;
    // Guarda los cambios en la base de datos const 
    catalogoActualizado = await catalogo.save();
     res.status(200).json(catalogoActualizado);
  } catch (e) { console.error(`Error: ${e}`); 
    res.status(500).json({ error: e.message }); }
};

module.exports = {
  crearCatalogo,
  actualizarImagenesParaVideo,
  actualizarVideo,
  actualizarImagenesParaGaleria,
  actualizarProductosDestacados,
  traerTodaLaInformacionDelCatalogo,
  actualizarDescripcion
};
