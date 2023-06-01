import CartManager from "../daos/mongodb/CartDao.js";
import ProductDao from "../daos/mongodb/ProductDao.js";


const cartDao = new CartManager ();
const prodDao = new ProductDao ();

export const getCartService = async (cid) =>{
    try {
        const cart = await cartDao.getCartById (cid);
        if (!cart) throw new Error("Carrito no encontrado");
        else return cart;
    } catch (error) {
        console.log (error);
    };
};
export const createCartService = async (product) =>{
    try {
        const newCart = await cartDao.addCart(product);
        if (!newCart) throw new Error ("No se pudo agregar al carrito");
        else return newCart;
    } catch (error) {
        console.log(error);
    };
};
export const addProductToCartService = async (cid, pid) =>{
    try {
        const consultacarrito = await cartDao.getCartById (cid);
        if (!consultacarrito) throw new Error ("El carrito no existe");
        const consultaproducto = await prodDao.getProductById (pid);
        if(!consultaproducto) throw new Error ("Producto no encontrado");
        const prodAdded = await cartDao.addProductToCart(cid, pid);
        return prodAdded;        
    } catch (error) {
        console.log (error);
    };
};

export const deleteProductToCartService = async (cid, pid) =>{
    try {
        const prodDelete = await cartDao.deleteProductToCart(cid, pid)
        if(!prodDelete) throw new Error ("El carrito no fue encontrado");
        return prodDelete;
    } catch (error) {
        console.log (error);
    };
};