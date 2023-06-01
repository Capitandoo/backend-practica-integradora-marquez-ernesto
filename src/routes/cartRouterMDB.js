import { Router } from "express";
import {
    getCartController,
    createCartController,
    addProductToCartController,
    deleteProductToCart
} from "../controllers/CartsController.js";

const router = Router();

router.get('/:cid', getCartController);
router.post('/', createCartController);
router.post('/:cid/products/:pid', addProductToCartController);
router.delete('/:cid/:pid', deleteProductToCart)

export default router
