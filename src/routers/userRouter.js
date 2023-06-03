import express from "express";
import { UserContent } from "../controllers/contenedorUsers.js";
import { CartContent } from '../controllers/contenedorCart.js';
import { createHash } from "../functions/crypt.js";

const router = express.Router();

const contenedorCarrito = new CartContent();
const contenedorUsuario = new UserContent();

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect('/api/user/dashboard');
    } else {
      next();
    }
  };

router.get('/singup',  async (req, res) => {
  res.render('singup');
});

router.post('/singup', async (req, res) => {
  const { name, lastname, mail, thumbnail, password } = req.body;
  let userExists = await contenedorUsuario.userExists(mail);
  if (userExists === true) {
    res.redirect('/api/user/singup');
  } else {
    try {
      const nuevoCarrito = await contenedorCarrito.save({ nombre: name, productos: [] });
      await contenedorUsuario.save({ name, lastname, mail, thumbnail, password: createHash(password), cart: nuevoCarrito.id });
      req.session.user = {
        name: findUsuario.name,
        mail: findUsuario.mail
      };
      res.redirect('/api/user/dashboard');
    } catch (error) {
      res.redirect('/api/user/singup');
    }
  }
});

router.get('/login', sessionChecker, async (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { mail, password } = req.body;
    const findUsuario = await contenedorUsuario.loginByMail(mail, password);
    req.session.user = {
      name: findUsuario.name,
      mail: findUsuario.mail
    };
    res.redirect('/api/user/dashboard');
  } catch (error) {
    res.send(`${error.message} <br><br><a href="/api/user/login"><button>Ir a Login</button></a>`);
  }
});

router.get('/dashboard', async (req, res) => {
    try {
    if (req.session.user && req.cookies.user_sid) {
      let usuario= await contenedorUsuario.getByMail(req.session.user.mail)
      res.render('dashboard', { user: usuario });
    } else {
      res.redirect('/api/user/login');
    }} catch (error) {
        res.send(`${error.message} <br><br><a href="/api/user/login"><button>Ir a Login</button></a>`);
      }
  });
  
  router.get('/logout', async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      req.session.destroy(err => {
        if (err) {
          return res.send({ err: 'Error al desloguearse' });
        }
        res.clearCookie('user_sid');
        res.redirect('/api/productos');
      });
    } else {
      res.redirect('/api/user/login');
    }
  });

export default router;