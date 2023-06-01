import {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductToCartService,
} from "../services/CartsService.js";

export const getCartController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await getCartService (cid);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const createCartController = async (req, res, next) => {
  try {
    const newCart = await createCartService ();
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await getCartService (cid);
    const prodAdded = await addProductToCartService (cid, pid);
    res.json(prodAdded);
  } catch (error) {
    next(error);
  }
};

export const deleteProductToCart = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const prodDelete = await deleteProductToCartService (cid, pid);
    res.json(prodDelete);
  } catch (error) {
    next(error);
  }
};
