const Producto = require("../models/productos.models");
const generarCodigo = () => {
  // Función para generar una letra mayúscula aleatoria
  function obtenerLetraMayuscula() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const indice = Math.floor(Math.random() * letras.length);
    return letras[indice];
  }

  // Función para generar un número aleatorio del 0 al 9
  function obtenerNumero() {
    return Math.floor(Math.random() * 10);
  }

  // Generar las letras mayúsculas
  let letrasMayusculas = "";
  for (let i = 0; i < 3; i++) {
    letrasMayusculas += obtenerLetraMayuscula();
  }

  // Generar los números
  let numeros = "";
  for (let i = 0; i < 3; i++) {
    numeros += obtenerNumero();
  }

  // Combinar letras y números
  return letrasMayusculas + numeros;
};
// crea los productos

const crearProducto = async (req, res) => {
  try {
    const {
      nombreproductos,
      estado,
      precio,
      descripcion,
      tallas,
      colores,
      imagenes,
      categorias,
    } = req.body;

    // Validar datos (esto es solo un ejemplo, usa una librería de validación para algo más robusto)
    if (!nombreproductos || !precio) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // Generar el código para el nuevo producto
    const codigo = generarCodigo();
    console.log("Datos que trae ", req.body);

    const producto = new Producto({
      codigo,
      nombreproductos,
      estado,
      precio,
      descripcion,
      tallas,
      colores,
      imagenes,
      categorias,
    });

    const data = await producto.save();
    res.status(201).json(data);
  } catch (e) {
    console.error("Error al guardar el producto:", e);
    res.status(500).json({ error: e.message });
  }
};
// trae la producto por el id

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (e) {
    console.error("Error al obtener los productos:", e);
    res.status(500).json({ error: e.message });
  }
};
// trae la producto por el id

const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "El producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (e) {
    console.error("Error al obtener el producto:", e);
    res.status(500).json({ error: e.message });
  }
};

//trae la productos que le pase en un array de ids
const obtenerProductosPorIds = async (req, res) => {
  const { id } = req.body;

  if (!id || !Array.isArray(id) || id.length === 0) {
    return res
      .status(402)
      .json({ message: "El array de IDs es necesario y no puede estar vacío" });
  }

  try {
    const productos = await Producto.find({ _id: { $in: id } });

    if (productos.length === 0) {
      return res
        .status(404)
        .json({
          message: "No se encontraron productos con los IDs proporcionados",
        });
    }

    res.status(200).json(productos);
  } catch (e) {
    console.error("Error al obtener los productos:", e);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// trae la producto por la categoria

const obtenerProductosPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  try {
    // Asumimos que `categoria` es una cadena de texto con múltiples categorías separadas por comas.
    const categoriasArray = categoria.split(",").map((cat) => cat.trim()); // Convierte la cadena en un array y elimina espacios

    const productos = await Producto.find({
      categorias: { $in: categoriasArray },
    });
    if (productos.length === 0) {
      return res
        .status(200)
        .json({ message: "No se encontraron productos para esta categoría" });
    }
    res.status(200).json(productos);
  } catch (e) {
    console.error("Error al obtener productos por categoría:", e);
    res.status(500).json({ error: e.message });
  }
};

//Buscar el producto
const buscarProductos = async (req, res) => {
  const { query } = req.params;

  try {
    const productos = await Producto.find({
      nombreproductos: { $regex: ".*" + query + ".*", $options: "i" }, // Crear una nueva expresión regular
    });
    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

//Editar producto por el id

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    nombreproductos,
    precio,
    descripcion,
    tallas,
    colores,
    imagenes,
    categorias,
  } = req.body;

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      {
        nombreproductos,
        precio,
        descripcion,
        tallas,
        colores,
        imagenes,
        categorias,
      },
      { new: true } // Devuelve el producto actualizado
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(productoActualizado);
  } catch (e) {
    console.error("Error al actualizar el producto:", e);
    res.status(500).json({ error: e.message });
  }
};

//cambiando de estado al producto
//cambio de estado

const cambiarEstadoProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const estadoProducto = producto.estado;

    // Verificar que el estado del producto sea 0 o 1
    if (estadoProducto !== 1 && estadoProducto !== 0) {
      return res
        .status(400)
        .json({ mensaje: "Este producto no puede ser cambiado de estado" });
    }
    // Cambiar el estado del producto
    producto.estado = estadoProducto === 1 ? 0 : 1;
    // Guardar el producto actualizado en la base de datos
    await producto.save();

    res.status(200).json({ datos: producto });
  } catch (error) {
    console.error("Error al cambiar el estado del producto:", error);
    res.status(500).json({ mensaje: error.message });
  }
};
// eliminar una producto por el id
const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  buscarProductos,
  actualizarProducto,
  cambiarEstadoProducto,
  eliminarProducto,
  obtenerProductosPorIds,
};
