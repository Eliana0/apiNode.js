import express from "express";
const router = express.Router();
import {CartContent} from '../controllers/contenedorCart.js';
import { UserContent } from "../controllers/contenedorUsers.js";
import { Contenedor } from '../controllers/contenedorProducts.js';

const contenedorCarrito = new CartContent();
const contenedorUsuario = new UserContent();

router.get('/', async(req, res) => {
  try {
    const session = req.session.user;
    const user = await contenedorUsuario.getByMail(session.mail);
    const userId = user.cart.toString();
    res.render('cartProducts', {user: await contenedorCarrito.getCartById(userId), products: await contenedorCarrito.readProductsCart(userId)} )
 } catch (error) {
     console.log(error.message);
 }
})

router.get('/:id/productos/:_id', async(req, res) => {
  const id = req.params.id;
  try {
    const producto = await contenedorCarrito.getElementById(id)
    res.json(producto)
  } catch (error) {
      console.log(error.message);
  }}
)

  router.post('/', async (req, res) => {
    try {
      const { nombre, productos } = req.body;
      const nuevoCarrito = await contenedorCarrito.save({ nombre, productos: [] });
      res.json(nuevoCarrito.id);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

 
  router.post('/:id/productos/:id_prod', async(req, res) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    const session = req.session.user;
    const user = await contenedorUsuario.getByMail(session.mail);
    const userId = user.cart.toString();
        try {
          const save = await contenedorCarrito.saveProductCartId(userId, productId)
          res.redirect('/api/cart');
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

  router.get('/:id/productos-delete/:id_prod', async(req, res) => {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
        try {
          await contenedorCarrito.deleteProductCartId(cartId, productId)
            res.redirect('/api/cart');
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
  });

export default router