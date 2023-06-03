# Proyecto tienda  Node.js y Express
Este proyecto es una aplicación web simple construida con Node.js y Express. La aplicación utiliza la base de datos de Mongoose para almacenar, recuperar, actualizar y eliminar productos, usuarios y carritos. También utiliza inicios de sesiones y cookies para tener una navegación personalizada.

## Requisitos previos 
Antes de comenzar, asegúrate de tener instalado Node.js en tu máquina. Puedes descargar la última versión estable de Node.js desde el sitio web oficial: https://nodejs.org

## Instalación 
Clona este repositorio en tu máquina local o descárgalo como archivo ZIP y descomprímelo.

Abre una terminal y navega hasta la carpeta del proyecto.

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

`npm install`

## Configuración de la base de datos
Asegúrate de tener instalado MongoDB en tu máquina local. Puedes descargar MongoDB Community Server desde el sitio web oficial: https://www.mongodb.com/try/download/community

Abre el archivo config.js en un editor de texto y modifica la URL de conexión de la base de datos según tus necesidades. Por ejemplo:

`module.exports = {
  dbURL: 'mongodb://localhost:27017/nombre-de-la-base-de-datos'
};`

## Uso
Inicia la aplicación ejecutando el siguiente comando:

`npm start`

La aplicación se ejecutará en http://localhost:8080.

Accede a http://localhost:8080/productos en tu navegador para ver la lista de productos.

## Estructura del proyecto
El proyecto sigue la siguiente estructura de carpetas y archivos:

/src
  /config
    db.js: Configuración de comunicación a la base de datos MongoDB.
  /controllers
    contenedorCart.js: Contenedor con funciones para las funcionalidades de las rutas de del carrito.
    contenedorProducts.js: Contenedor con funciones para las funcionalidades de las rutas de productos.
    contenedorUsers.js: Contenedor con funciones para las funcionalidades de las rutas de usuarios.
  /functions
    chatSocket.js: Funcionamiento del chat en tiempo real con websocket.
    crypt.js: Configuración para usar bcrypt y guardar contraseñas en bases de datos encriptadas.
    server: Funcionamiento del servidor.
  /models
    cartModels.js: Diseño de la estructura de datos de los elementos del carrito para la base de datos.
    productModels.js: Diseño de la estructura de datos de los elementos de los productos para la base de datos.
    userModels.js: Diseño de la estructura de datos de los elementos de los usuarios para la base de datos.
  /routers
    cartRoter.js: Ruteo para el carrito.
    productsRouter.js: Ruteo para los productos.
    userRouter.js: Ruteo para los usuarios.
  app.js: Punto de entrada de la aplicación donde se configura y se inicia el servidor Express.
/views
  /partials
    header.ejs: Vista front del header.
   cartProducts.ejs: Vista de los productos del carrito del cliente.
   chat.ejs: Vista al chat hecho con socket.
   dashboard.ejs: Vista a los datos del cliente.
   index.js: Funcionalidad de js del chat.
   login.ejs: Formulario con mail y password para loguear usuarios.
   singup.ejs: Formulario de registro de usuario.
   updateProducts.ejs: Formulario para cambiar datos de los productos de la tienda.
   vistaAllProducts.ejs: Vista a todos los productosd e la tienda.

## Autor 
Eliana Cristaldo

Linkedin: https://www.linkedin.com/in/eliana-cristaldo0408/
