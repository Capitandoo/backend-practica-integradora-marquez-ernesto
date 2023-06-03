import CartDao from "../daos/mongodb/CartDao.js";
import ProductDao from "../daos/mongodb/ProductDao.js";
import CartManager from "../daos/filesystem/CartDao.js";
import ProductManager from "../daos/filesystem/ProductDao.js";
import { pathCarritos } from "../path.js";
import { pathProducts } from "../path.js";


const cartDao = new CartDao ();
const prodDao = new ProductDao ();
//const cartDao = new CartManager (pathCarritos);
//const prodDao = new ProductManager (pathProducts);

export const getCartService = async (cid) =>{
    try {
        const cart = await cartDao.getCartById (cid);
        if (!cart) throw new Error("Carrito no encontrado")({message: `Carrito con id: ${cid} no fue encontrado`});
        else return cart;
    } catch (error) {
        console.log (error);
    };
};
export const createCartService = async (product) =>{
    try {
        const newCart = await cartDao.addCart(product);
        if (!newCart) throw new Error ("No se pudo agregar al carrito")({message: `No se pudo agregar el carrito`});
        else return newCart;
    } catch (error) {
        console.log(error);
    };
};
export const addProductToCartService = async (cid, pid) =>{
    try {
        const consultacarrito = await cartDao.getCartById (cid);
        if (!consultacarrito) throw new Error ("El carrito no existe")({message: `El carrito con id: ${cid} no existe`});
        const consultaproducto = await prodDao.getProductById (pid);
        if(!consultaproducto) throw new Error ("Producto no encontrado")({message: `El producto con id: ${pid} no existe`});
        const prodAdded = await cartDao.addProductToCart(cid, pid);
        return prodAdded;        
    } catch (error) {
        console.log (error);
    };
};

export const deleteProductToCartService = async (cid, pid) =>{
    try {
        const prodDelete = await cartDao.deleteProductToCart(cid, pid)
        if(!prodDelete) throw new Error ("El carrito no fue encontrado")({message: `El producto con id: ${cid} no fue encontrado`});
        return prodDelete ({message: `El producto con id: ${pid} fue borrado`});
    } catch (error) {
        console.log (error);
    };
};