# Proyecto tienda  Node.js y Express
Este proyecto es una aplicación web simple construida con Node.js y Express. La aplicación utiliza la base de datos de Mongoose para almacenar y recuperar productos.

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

app.js: Punto de entrada de la aplicación donde se configura y se inicia el servidor Express.
controllers/productController.js: Controlador que maneja las solicitudes relacionadas con los productos.
models/productModel.js: Modelo de Mongoose para el producto.
routes/productRoutes.js: Rutas de la API relacionadas con los productos.
config.js: Archivo de configuración que contiene la URL de conexión de la base de datos.
package.json: Archivo de configuración de npm que contiene las dependencias y los scripts del proyecto.

## Autor 
Eliana Cristaldo

Linkedin: https://www.linkedin.com/in/eliana-cristaldo0408/
