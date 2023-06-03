import { CartsModel } from "./models/CartsModel.js";
import { ProductsModel } from "./models/ProductModel.js";

export default class CartDao {

  async getCarts() {
    try {
      const response = await CartsModel.find ({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addCart() {
    try {
      const response = await CartsModel.create ({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const response = await CartsModel.findById (cid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid){
    try {
        const findCart = await CartsModel.findById (cid);
        const allprod = await ProductsModel.find ();
        const proFind = allprod.find ((pro) => pro.id === pid);
        
        if(proFind){
          if(findCart){
            const proInCart = await findCart.products.find((product) => product.product === pid);
            if(proInCart){
              const indexPro = findCart.products.findIndex ((pro) => pro.product === pid);
              findCart.products[indexPro].quantity++;
              await CartsModel.findByIdAndUpdate ({ _id: cid }, { $set: findCart });
              return findCart;
            } else {
              const newProd = {product: pid, quantity: 1};
              findCart.products.push (newProd);
              await CartsModel.findByIdAndUpdate ({ _id: cid }, { $set: findCart });
              return findCart;
            }
          }
        }
    } catch (error) {
        console.log(error)
    }
  }

  async deleteProductToCart (cid, pid){
    try {
        const cartFind = await CartsModel.findById(cid);
        const existingProduct = await cartFind.products.find(product => product.product === pid);
        if(!existingProduct){
            throw new Error('the product you are trying to remove does not exist')
        } else{
            if(existingProduct.quantity > 1){
                const updatedQuantity = existingProduct.quantity - 1
                await CartsModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {$set: {'products.$.quantity': updatedQuantity}}
                );
            } else{
                await CartsModel.findOneAndUpdate(
                    {_id: cartId},
                    {$pull: {products: {_id: prodId}}},
                );
            };
        };
        const cartUpdate = await CartsModel.findById(cid)
        return cartUpdate
    } catch (error) {
        console.log(error)
    };
  };

}

