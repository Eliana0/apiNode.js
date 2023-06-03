import { server, app, express, session, baseSessions, cookieParser } from './functions/server.js'

import methodOverride from 'method-override';
import chatSocket from './functions/chatSocket.js'

import apiProductos from './routers/productsRouter.js'
import apiCart from './routers/cartRouter.js'
import apiUser from './routers/userRouter.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('views'));
app.use(baseSessions)
app.use(cookieParser());
app.use(session({
  secret: "c0d3r",
  key: 'user_side',
  resave: true,
  saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.set('views', './views')


app.get('/chat', async(req, res) =>  {
  res.render('chat')
})

app.use('/api/productos', apiProductos)
app.use('/api/cart', apiCart)
app.use('/api/user', apiUser)