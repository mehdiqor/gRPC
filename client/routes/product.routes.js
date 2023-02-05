const { listProduct, createProduct, updateProduct, deleteProduct, getProduct } = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/create", createProduct);
router.get("/update", updateProduct);
router.get("/list", listProduct);
router.get("/:id", getProduct);
router.get("/delete/:id", deleteProduct);

module.exports = {
    ProductRoutes : router
}