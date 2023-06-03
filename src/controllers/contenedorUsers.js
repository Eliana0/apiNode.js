import { UserModel } from "../models/userModels.js";
import { isValid } from "../functions/crypt.js";

export class UserContent {

    async save(object) {
      try {
        const user = await UserModel.create(object);
        return user;
      } catch (error) {
        throw new Error('Error al guardar el usuario en la base de datos');
      }
    }

    async loginByMail(mail, password) {
      try {
        const user = await UserModel.findOne({ mail });
        if (user && isValid(user, password)) {
          return user;
        } else {
          throw new Error('Usuario no existente o contraseña incorrecta');
        }
      } catch (error) {
        throw new Error('Error al buscar el usuario');
      }
    }

    async userExists(obj) {
      try {
        const user = await UserModel.findOne({ mail: obj });
        return !!user;
      } catch (error) {
        throw new Error('Error al buscar el usuario');
      }
    }
  
    async getByMail(mail) {
      try {
        const user = await UserModel.findOne({ mail });
          return user;
      } catch (error) {
        throw new Error('Error al buscar el usuario');
      }
    }

}