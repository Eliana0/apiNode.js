import express  from "express";
const router = express.Router();
import { Contenedor } from '../controllers/contenedorProducts.js'
import { UserContent } from "../controllers/contenedorUsers.js";

let admin = false;

const contenedor = new Contenedor()
const contenedorUsuario = new UserContent();

router.get('/', async(req, res) => {
    try {
      const session = req.session.user;
      const user = await contenedorUsuario.getByMail(session.mail);
      const userId = user._id.toString();
       res.render('vistaAllProducts', {products: await contenedor.getAll(userId), admin: admin, user: userId} )
    } catch (error) {
        console.log(error.message);
    }
  })


router.get('/:id', async(req, res) => {
  const id = req.params.id;
    if(admin == true){
      try {
        res.render('updateProducts', {products: await contenedor.getById(id)} )
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }else{
      res.status(404);
    }
});


router.post('/', async (req, res) => {
  if (admin == true) {
    try {
      const { price, title, thumbnail, timestamp, descripcion, stock } = req.body;
      await contenedor.save({ price, title, thumbnail, timestamp, descripcion: descripcion.split(','), stock });
      res.redirect('/api/productos');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(404);
  }
});
router.post('/update/:id', async (req, res) => {
  if (admin == true) {
    try {
      const id = req.params.id;
      const { price, title, thumbnail, timestamp, descripcion, stock } = req.body;
      const descripcionArray = descripcion.split(',').map(item => item.trim());
      console.log(descripcionArray)
      await contenedor.updateProducto(id, price, title, thumbnail, descripcionArray, stock);
      res.redirect('/api/productos');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(404);
  }
});


router.get('/eliminar/:id', async(req, res) => {
  if(admin == true){
    const id = req.params.id;
    try {
      const deletedProducto = await contenedor.deleteById(id);
      res.redirect('/api/productos');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }else{
    res.status(404);
  }
});

export default router