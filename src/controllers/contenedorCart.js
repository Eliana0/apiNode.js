const { Contenedor } = require('./contenedorProducts.js');
const fs = require('fs').promises;

const contenedor = new Contenedor('productos.txt');

class CartContent {
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
        const productById = await this.getCartById(object.id);
        this.nextId = maxNumber + 2;
        return productById;
      } catch (error) {
        throw new Error('Error al guardar el carrito en el archivo');
      }
    }

    async readProductsCart(id) {
        try {
          const cart = await this.getCartById(parseInt(id));
          const productos = cart.productos;
          const promises = productos.map(async (element) => {
            return await contenedor.getById(element);
          });
          return await Promise.all(promises);
        } catch (err) {
          throw new Error('Error al leer los productos del carrito');
        }
      }

      async saveProductCartId(cartId, productId) {
        try {
          const products = await this.getAll();
          const cart = await this.getCartById(parseInt(cartId));
          const product = await contenedor.getById(parseInt(productId));
          const productID = product.id;
          const newProductos = [...cart.productos, productID];
          const productIndex = products.findIndex(product => product.id === cart.id);
          products[productIndex] = {
            nombre: cart.nombre,
            productos: newProductos,
            id: cart.id
          };
          await fs.writeFile(this.archivo, JSON.stringify(products, null, 2));
          const cartProductos = await Promise.all(newProductos.map(async (element) => {
            const findElementById = await contenedor.getById(element);
            return findElementById;
          }));
      
          const retorna = `Nombre: ${cart.nombre}, productos: ${cartProductos.map(obj => JSON.stringify(obj, null, 2)).join(',\n')}`;
          return retorna;
        } catch (err) {
          throw new Error('Error al guardar el objeto en el carrito');
        }
      }
   

      async getElementById(id) {
        try {
          const objects = await this.getAll();
          const cart = objects.find(object => object.id === id) || null;
          if (cart) {
            const cartProductosID = cart.productos;
            const cartProductos = [];
            for (const element of cartProductosID) {
              const findElementById = await contenedor.getById(element);
              cartProductos.push(findElementById);
            }
            return cartProductos;
          } else {
            throw new Error('Carrito no encontrado');
          }
        } catch (error) {
          throw new Error('Error al obtener el objeto por su id');
        }
      }
      
    async getCartById(id) {
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

    async deleteProductCartId(cartId, productId) {
        try {
          const products = await this.getAll();
          const cart = await this.getCartById(parseInt(cartId));
          const newProductos = cart.productos.filter(product => product !== parseInt(productId));
          const productIndex = products.findIndex(product => product.id === cart.id);
          products[productIndex] = {
            nombre: cart.nombre,
            productos: newProductos,
            id: cart.id
          };
          await fs.writeFile(this.archivo, JSON.stringify(products, null, 2));
          const retorna = `Nombre: ${cart.nombre}, productos: ${newProductos.join(', ')}`;
          return retorna;
        } catch (err) {
          throw new Error('Error al guardar el objeto en el carrito');
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
  

  module.exports = {CartContent}