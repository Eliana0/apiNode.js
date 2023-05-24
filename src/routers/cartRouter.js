const express =  require("express");
const router = express.Router();
const {CartContent} = require('../controllers/contenedorCart.js');
const { Contenedor } = require('../controllers/contentProducts.js');
const contenedorCarrito = new CartContent('productsCart.txt');
const contenedor = new Contenedor('productos.txt');

let admin = false;

router.get('/:id/productos', async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const producto = await contenedorCarrito.getElementById(id)
    res.json(producto)
  } catch (error) {
      console.log(error.message);
  }}
)

router.post('/', async(req, res) => {
      try {
            const { nombre, productos } = req.body;
            const nuevoCarrito = await contenedorCarrito.save({nombre, productos});
            res.json(nuevoCarrito.id)
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
  });

 
  router.post('/:id/productos/:id_prod', async(req, res) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
        try {
          const save = await contenedorCarrito.saveProductCartId(cartId, productId)
            res.send(save);
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
  });

  router.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    try {
      const deletedProducto = await contenedorCarrito.deleteById(id);
      res.json(deletedProducto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
    });

  router.delete('/:id/productos/:id_prod', async(req, res) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
        try {
          const save = await contenedorCarrito.deleteProductCartId(cartId, productId)
            res.send(save);
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
  });

module.exports = router