const { server, app, express } = require('./functions/server.js')
const methodOverride = require('method-override');
const apiProductos = require('./routers/productsRouter.js')
const apiCart = require('./routers/cartRouter.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('views'));

app.set('views', './views')
app.set('view engine', 'ejs');

app.get('/chat', async(req, res) =>  {
  res.render('chat')
})

app.use('/api/productos', apiProductos)
app.use('/api/cart', apiCart)
