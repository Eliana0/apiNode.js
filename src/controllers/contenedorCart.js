import { Contenedor } from './contenedorProducts.js';
import { ProductModel } from '../models/productModels.js';
import { CartModel } from '../models/cartModels.js'
import files from 'fs';

const fs= files.promises
const contenedor = new Contenedor('productos.txt');
const contenedorCarrito = new CartModel()

export class CartContent {

    async save(object) {
      try {
        const product = await CartModel.create(object);
        return product;
      } catch (error) {
        throw new Error('Error al guardar el carrito');
      }
    }

    async readProductsCart(id) {
        try {
          const cart = await this.getCartById(id);
          const productos = cart.productos;
          const promises = productos.map(async (element) => {
            return await contenedor.getById(element);
          });
            return await Promise.all(promises);
        } catch (err) {
          throw new Error('Error al leer los productos del carrito');
        }
      }
   
      async saveProductCartId(userId, productId) {
        try {
          const cart = await this.getCartById(userId);
          const product = await contenedor.getById(productId);
          const productID = product.id;
          const newProductos = [...cart.productos, productID];
          const updatedCart = await CartModel.findByIdAndUpdate(userId, {
            productos: newProductos
          }, { new: true });
      
          return updatedCart;
        } catch (error) {
          throw new Error('Error al guardar el producto en el carrito');
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
        const object = await CartModel.findById(id);
        return object || null;
      } catch (error) {
        throw new Error('Error al obtener el objeto por su id');
      }
    }

    async getAll() {
      try {
        const data = await CartModel.find()
        return data;
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

/*     async deleteProductCartId(cartId, productId) {
        try {
          //await CartModel.findByIdAndDelete()
          const cart = await this.getCartById(cartId);
          const cartProducts = cart.productos;
          console.log(cartProducts)
          await CartModel.cartProducts.findByIdAndDelete(productId)
        } catch (err) {
          throw new Error('Error al borrar el objeto del carrito');
        }
      } */
      async deleteProductCartId(cartId, productId) {
        try {
          const cart = await this.getCartById(cartId);
          const cartProducts = cart.productos;
          const updatedProducts = cartProducts.filter((product) => product !== productId);
          const updatedCart = await CartModel.findByIdAndUpdate(cartId, {
            productos: updatedProducts
          }, { new: true });
          return updatedCart;
        } catch (error) {
          throw new Error('Error al borrar el objeto del carrito');
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
  