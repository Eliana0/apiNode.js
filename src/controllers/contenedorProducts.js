import { ProductModel } from '../models/productModels.js';

export class Contenedor {

    async save(object) {
      try {
        const product = await ProductModel.create(object);
        return product;
      } catch (error) {
        throw new Error('Error al guardar el producto en el archivo');
      }
    }
  
    async getById(id) {
      try {
        const object = await ProductModel.findById(id);
        return object || null;
      } catch (error) {
        throw new Error('Error al obtener el objeto por su id');
      }
    }
  
    async getAll() {
      try {
        const data = await ProductModel.find()
        return data;
      } catch (error) {
        return [];
      }
    }

    async updateProducto(id, newPrice, newTitle, newThumbnail, newDescripcion, newStock) {
      try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
          title: newTitle,
          price: newPrice,
          thumbnail: newThumbnail,
          descripcion: newDescripcion,
          stock: newStock
        });
    
        if (!updatedProduct) {
          throw new Error('El producto no existe');
        }
    
        return updatedProduct;
      } catch (error) {
        throw new Error('Error al actualizar el producto en el archivo');
      }
    }
  
    async deleteById(id) {
      try {
        const object = await ProductModel.findByIdAndDelete(id);
        return object || null;
      } catch (error) {
        throw new Error('Error al borrar el objeto por su id');
      }
    }
  
    async deleteAll() {
      try {
        await ProductModel.deleteMany();
      } catch (error) {
        throw new Error('Error al eliminar todos los objetos del archivo');
      }
    }
  }
