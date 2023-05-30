import { msgModel } from "./models/MessagesModel.js";

export default class MessagesDao {

  async createMsg(msg) {
    try {
      const response = await msgModel.create(msg);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const response = await msgModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await msgModel.findById(id);
      return response;
    } catch (error) {
      console.log (error);
    }
  }

  async updateMsg(id, update) {
    try {
      const response = await msgModel.updateOne ({id: id}, update);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMsg(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete (id);
      return response;
    } catch (error) {
      console.log (error);
    }
  }

};

