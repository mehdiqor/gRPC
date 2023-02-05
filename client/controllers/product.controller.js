const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const productProtoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProto = protoLoader.loadSync(productProtoPath);
const {ProductPackage} = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:4001";
const productClient = new ProductPackage.ProductService(productServiceURL, grpc.credentials.createInsecure());

function createProduct(req, res, next){
    const {title, price} = req.query;
    productClient.createProduct({title, price}, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function updateProduct(req, res, next){}
function listProduct(req, res, next){
    productClient.listProduct(null, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function getProduct(req, res, next){}
function deleteProduct(req, res, next){}

module.exports = {
    createProduct,
    updateProduct,
    listProduct,
    getProduct,
    deleteProduct
}