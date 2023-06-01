import { ProductsModel } from "./models/ProductModel.js";


export default class ProductDao {

  async getProducts(limit) {
    try {
      const response = await ProductsModel.find({}).limit(limit);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const response = await ProductsModel.create (product);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductsModel.findById (id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, update) {
    try {
      const response = await ProductsModel.updateOne ({id: id}, update);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete (id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
