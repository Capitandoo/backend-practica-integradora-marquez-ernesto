import { Router } from "express";
import {
    getCartController,
    createCartController,
    addProductToCartController,
    deleteProductToCart
} from '../controllers/cartController.js';

const router = Router();

router.get('/:id', getCartController);
router.post('/', createCartController);
router.put('/:cartId/:prodId', addProductToCartController);
router.delete('/:cartId/:prodId', deleteProductToCart)

export default router
