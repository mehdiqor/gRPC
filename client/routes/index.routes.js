const { ProductRoutes } = require("./product.routes");
const router = require("express").Router();

router.use("/product", ProductRoutes)

module.exports = {
    AllRoutes : router
}