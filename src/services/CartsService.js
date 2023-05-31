import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
const cartDao = new CartsDaoMongoDB();
const prodDao = new ProductsDaoMongoDB();

export const getCartController = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const cart = await cartDao.getCart(id);
        res.json(cart);
    } catch (error) {
        next(error)
    };
};
export const createCartController = async (req, res, next) =>{
    try {
        const newCart = await cartDao.createCart()
        res.json(newCart)
    } catch (error) {
        next(error)
    };
};
export const addProductToCartController = async (req, res, next) =>{
    try {
        const cartId = req.params.cartId;
        const prodId = req.params.prodId;
        const existenceValidator = await prodDao.getProductById(prodId)
        if(existenceValidator){
            const prodAdded = await cartDao.addProductToCart(prodId, cartId);
            res.json(prodAdded);
        } else{
            res.status(404).json('the product you are trying to add does not exist')
        }
    } catch (error) {
        next(error)
    };
};
export const deleteProductToCart = async (req, res, next) =>{
    try {
        const cartId = req.params.cartId;
        const prodId = req.params.prodId;
        const prodDelete = await cartDao.deleteProductToCart(prodId, cartId)
        if(prodDelete){
            res.json(prodDelete);
        } else{
            res.status(404).json('error: the product you are trying to remove does not exist')
        }
    } catch (error) {
        next(error)
    }
};