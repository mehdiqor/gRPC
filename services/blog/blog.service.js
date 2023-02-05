const { listBlog, getBlog, createBlog, updateBlog, deleteBlog } = require("./functions/blog.grpc");
require("../product/config/db.connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath);
const {BlogPackage} = grpc.loadPackageDefinition(blogProto);
const blogServiceURL = "localhost:4002";

function main(){
    const server = new grpc.Server();
    server.addService(BlogPackage.BlogService.service, {
        createBlog,
        updateBlog,
        listBlog,
        getBlog,
        deleteBlog
    })
    server.bindAsync(blogServiceURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if(err) return console.log(err.message);
        console.log("gRPC Blog Service Runnig Over Port " + port);
        server.start();
    })
}
main()