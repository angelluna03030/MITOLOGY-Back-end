const Categoria = require("../models/categoria.modelo");
// trae los categorias
const traerTodasLasCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};
// trae la categoria por el id
const obtenerCategoriaPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(categoria);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

//crea una categoria
const crearCategoria = async (req, res) => {
  const { nombre, imagen, descripcion } = req.body;
  const estado = 1;
  console.log("categoria en esl controladdor ", req.body);
  const nuevaCategoria = new Categoria({
    nombre,
    imagen,
    descripcion,
    estado,
  });

  try {
    const data = await nuevaCategoria.save();
    res.status(201).json(data);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

//Editar categoria por el id
const actualizarCategoria = async (req, res) => {
  const id = req.params.id;
  const { nombre, imagen, descripcion } = req.body;

  try {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      { nombre, imagen, descripcion },
      { new: true }
    );
    if (!categoriaActualizada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(categoriaActualizada);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

// eliminar una categoria por el id
const eliminarCategoria = async (req, res) => {
  const id = req.params.id;

  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ error: e.message });
  }
};

const cambiarEstadoCategoria = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoria no encontrado" });
    }

    const estadoCategoria = categoria.estado;

    // Verificar que el estado del producto sea 0 o 1
    if (estadoCategoria !== 1 && estadoCategoria !== 0) {
      return res
        .status(400)
        .json({ mensaje: "Este Categoria no puede ser cambiado de estado" });
    }

    // Cambiar el estado del producto
    categoria.estado = estadoCategoria === 1 ? 0 : 1;

    // Guardar el producto actualizado en la base de datos
    await categoria.save();
    res.status(200).json({ datos: categoria });
  } catch (error) {
    console.error("Error al cambiar el estado del producto:", error);
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  traerTodasLasCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  cambiarEstadoCategoria,
};
