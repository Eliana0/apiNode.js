const express = require('express');
const { Server } = require('socket.io');
const fs = require('fs').promises;
const methodOverride = require('method-override');

const app = express();
const port = 8080;

let chat = [];

const server = app.listen(port, () => console.log('Server Up'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('views'));

app.set('views', './views')
app.set('view engine', 'ejs');

const io = new Server(server);
const date = new Date();
const hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
const minutos = date.getMinutes();

io.on('connection', socket => {
  socket.broadcast.emit('alert') //envia a todos menos al cliente
  socket.emit('history', chat) //envía sólo al usuario
  socket.on('message', data => {
    chat.push({hour: `${hour}:${minutos}`, message: data}) //envia información a todos los servidores
    io.emit('history', chat)
  })
})



class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.nextId = 1;
  }

  async save(object) {
    try {
      const objects = await this.getAll();
      const maxNumber = Math.max(...objects.map(obj => obj.id), 0);
      object.id = maxNumber + 1;
      objects.push(object);
      await fs.writeFile(this.archivo, JSON.stringify(objects, null, 2));
      const productById = await this.getById(object.id);
      this.nextId = maxNumber + 2;
      return productById;
    } catch (error) {
      throw new Error('Error al guardar el objeto en el archivo');
    }
  }

  async getById(id) {
    try {
      const objects = await this.getAll();
      return objects.find(object => object.id === id) || null;
    } catch (error) {
      throw new Error('Error al obtener el objeto por su id');
    }
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.archivo, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async updateProducto(id, newPrice, newTitle, newThumbnail) {
    try {
      const products = await this.getAll();
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex !== -1) {
        products[productIndex] = {
          title: newTitle,
          price: newPrice,
          thumbnail: newThumbnail,
          id: id
        };
        await fs.writeFile(this.archivo, JSON.stringify(products, null, 2));
        return products[productIndex];
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error('Error al actualizar el producto en el archivo');
    }
  }

  async deleteById(id) {
    try {
      const objects = await this.getAll();
      const filteredObjects = objects.filter(object => object.id !== id);
      await fs.writeFile(this.archivo, JSON.stringify(filteredObjects, null, 2));
      return objects
    } catch (error) {
      throw new Error('Error al eliminar el objeto por su id');
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.archivo, '[]');
    } catch (error) {
      throw new Error('Error al eliminar todos los objetos del archivo');
    }
  }
}

const contenedor = new Contenedor('productos.txt');

app.get('/', async(req, res) =>  {
  res.render('formProducts', {products: await contenedor.getAll()} )
})

app.get('/chat', async(req, res) =>  {
  res.render('chat' )
})

app.get('/api/productos', async(req, res) => {
        try {
           res.render('vistaAllProducts', {products: await contenedor.getAll()} )
        } catch (error) {
            console.log(error.message);
        }}
)

app.get('/api/update-productos/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    res.render('updateProducts', {products: await contenedor.getById(id)} )
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/productos', async(req, res) => {
  try{
    const { price, title, thumbnail } = req.body;
    const nuevoProducto = await contenedor.save({price, title, thumbnail});
    res.redirect('/api/productos')
  }catch (error) {
    res.status(404).json({ error: error.message });
}
});


app.put('/api/update-productos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { price, title, thumbnail } = req.body;

    const productoActualizado = await contenedor.updateProducto(id, price, title, thumbnail);

    res.json(productoActualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.delete('/api/productos/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedProducto = await contenedor.deleteById(id);
    res.json(deletedProducto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});