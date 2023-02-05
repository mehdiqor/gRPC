const { listProduct, getProduct, createProduct, updateProduct, deleteProduct } = require("./functions/product.grpc");
require("./config/db.connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath);
const {ProductPackage} = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:4001";

function main(){
    const server = new grpc.Server();
    server.addService(ProductPackage.ProductService.service, {
        createProduct,
        updateProduct,
        listProduct,
        getProduct,
        deleteProduct
    })
    server.bindAsync(productServiceURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if(err) return console.log(err.message);
        console.log("gRPC Product Service Runnig Over Port " + port);
        server.start();
    })
}
main()