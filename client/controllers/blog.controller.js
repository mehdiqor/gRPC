const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const blogProtoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(blogProtoPath);
const {BlogPackage} = grpc.loadPackageDefinition(blogProto);
const blogServiceURL = "localhost:4001";
const blogClient = new BlogPackage.BlogService(blogServiceURL, grpc.credentials.createInsecure());

function createBlog(req, res, next){
    const {title, price} = req.query;
    blogClient.createBlog({title, price}, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function updateBlog(req, res, next){
    const data = req.query;
    blogClient.updateBlog(data, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function listBlog(req, res, next){
    blogClient.listBlog(null, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function getBlog(req, res, next){
    const {id} = req.params;
    blogClient.getBlog({id}, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function deleteBlog(req, res, next){
    const {id} = req.params;
    blogClient.deleteBlog({id}, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}

module.exports = {
    createBlog,
    updateBlog,
    listBlog,
    getBlog,
    deleteBlog
}