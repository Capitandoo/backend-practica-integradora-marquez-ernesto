import { Router } from "express";
import ProductManager from "../daos/filesystem/ProductDao.js";

const router = Router ();
const productManager = new ProductManager();

router.get ("/", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("home", {
    productos: allProducts,
  });
});

router.get ("/realtimeproducts", async (req, res) => {
  res.render ("realtimeproducts");
});


export default router;
