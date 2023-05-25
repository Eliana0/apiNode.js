const fs = require('fs').promises;


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
        console.log('err')
        const productById = await this.getById(object.id);
        this.nextId = maxNumber + 2;
        return productById;
      } catch (error) {
        throw new Error('Error al guardar el produycto en el archivo');
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
  
    async updateProducto(id, newPrice, newTitle, newThumbnail, newTimestamp, newDescripcion, newStock) {
      try {
        const products = await this.getAll();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
          products[productIndex] = {
            title: newTitle,
            price: newPrice,
            thumbnail: newThumbnail,
            timestamp: newTimestamp, 
            descripcion: newDescripcion, 
            stock: newStock,
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


  module.exports = { Contenedor }