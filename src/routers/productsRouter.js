const express =  require("express");
const router = express.Router();
const { Contenedor } = require('../controllers/contenedorProducts.js')

let admin = false;
const contenedor = new Contenedor('productos.txt')

router.get('/', async(req, res) => {
    try {
       res.render('vistaAllProducts', {products: await contenedor.getAll(), admin: admin} )
    } catch (error) {
        console.log(error.message);
    }
  })


router.get('/:id', async(req, res) => {
  const id = parseInt(req.params.id);
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


router.post('/', async(req, res) => {
  if(admin == true){
    try{
      const { price, title, thumbnail, timestamp, descripcion, stock } = req.body;
      await contenedor.save({price, title, thumbnail, timestamp, descripcion, stock});
      res.redirect('/api/productos')
    }catch (error) {
      res.status(404).json({ error: error.message });
    }
  }else{
    res.status(404);
  }
});


router.post('/update/:id', async (req, res) => {
  if(admin == true){
    try {
      const id = parseInt(req.params.id);
      const { price, title, thumbnail, timestamp, descripcion, stock  } = req.body;
      await contenedor.updateProducto(id, price, title, thumbnail, timestamp, descripcion, stock );
      res.redirect('/api/productos');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }else{
    res.status(404);
  }
});


router.get('/eliminar/:id', async(req, res) => {
  if(admin == true){
    const id = parseInt(req.params.id);
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

module.exports = router