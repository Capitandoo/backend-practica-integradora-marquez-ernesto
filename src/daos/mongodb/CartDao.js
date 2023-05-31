import fs from 'fs';
import { pathCarritos } from '../../path.js';
import ProductManager from './ProductDao.js';

const consultaProducto = new ProductManager ();

export default class CartManager {
  constructor() {
    this.path = pathCarritos;
  }

  async getCarts () {
    try {
        if (!fs.existsSync (this.path)){
            fs.writeFileSync (this.path, '[]');
        }
        const carts = JSON.parse (await fs.promises.readFile (this.path, 'utf8'));
        return carts;
    } catch (error) {
        console.log (error);
    }
}
  
  async addCart (product) {
    try{
        const products = await this.getCarts ();
        const id = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = { id: id + 1, products: [] };
        products.push(newProduct);
        await fs.promises.writeFile (this.path, JSON.stringify (products));
        return newProduct;
    } catch (error) {
        console.log (error);
    }
}
  
  async getCartById(cid) {
    try {
      const cartById = await this.getCarts();
      const data = cartById.find ((cart) => cart.id === cid);
      if (!data) {
        console.log(`El carrito con el id ${cid} no fue encontrado`);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart (cid, pid) {
    try {
      const cart = await this.getCartById (parseInt(cid));
      if (!cart) return "El carrito no existe";
      const productById = await consultaProducto.getProductById (parseInt(pid));
      if (!productById) return "Producto no encontrado";
      const cartsAll = await this.getCarts ();
      const cartFilter = cartsAll.filter (cart => cart.id != cid);
      const productBuscado = cart.products.some ((prod) => prod.product === parseInt(pid))
      if (productBuscado) {
        const productInCart = cart.products.find (prod => prod.product === parseInt(pid));
        productInCart.quantity++;
        const cartsConcat = [cart, ...cartFilter];
        await this.saveCarts (cartsConcat);
        return "Producto sumado al carrito";
      }
      cart.products.push ({product: productById.id, quantity: 1});
      const cartsConcat = [cart, ...cartFilter];
      await this.saveCarts (cartsConcat);
      return "Producto agregado al Carrito";
    } catch (error) {
      console.log(error);
    }
  };

  async saveCarts (cart) {
    await fs.promises.writeFile (this.path, JSON.stringify (cart));
  };

}

/*export default class CartsDaoMongoDB {
    async createCart() {
        try {
        const response = await CartsModel.create({});
        return response;
        } catch (error) {
        console.log(error);
        };
    };
    async getCart(id) {
        try {
            const response = await CartsModel.findById(id)
            return response;
        } catch (error) {
            console.log(error);
        };
    };
    async addProductToCart(prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId)
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(existingProduct){
                const updatedQuantity = existingProduct.quantity + 1
                await CartsModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {$set: {'products.$.quantity': updatedQuantity}}
                );
            } else{
                await CartsModel.findOneAndUpdate(
                    {_id: cartId},
                    {$push: {products: {_id: prodId, quantity: 1}}},
                );
            };
            const cartUpdate = await CartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
    async deleteProductToCart (prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId);
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
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
            const cartUpdate = await CartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
};*/
