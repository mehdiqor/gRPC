const { ProductModel } = require("../model/product.model")

async function createProduct(call, callback){
    try {
        const {title, price} = call.request;
        await ProductModel.create({title, price});
        callback(null, {status : "Created"})
    } catch (error) {
        callback(error, null)
    }
}
async function updateProduct(call, callback){
    try {
        const {id} = call.request;
        const data = call.request;
        delete data.id;
        const result = await ProductModel.updateOne({id}, {$set : data});
        if(result.modifiedCount == 0) return callback({message  : "Not Updated"}, null);
        callback(null, {status : "Updated"});
    } catch (error) {
        callback(error, null)
    }
}
async function listProduct(call, callback){
    try {
        const products = await ProductModel.find({})
        callback(null, {products})
    } catch (error) {
        callback(error, null)
    }
}
async function getProduct(call, callback){
    try {
        const {id} = call.request;
        const product = await ProductModel.findOne({id});
        callback(null, product)
    } catch (error) {
        callback(error, null)
    }
}
async function deleteProduct(call, callback){
    try {
        const {id} = call.request;
        const result = await ProductModel.deleteOne({id});
        if(result.deletedCount == 0) return callback({message  : "Not Deleted"}, null);
        callback(null, {status : "Deleted"})
    } catch (error) {
        callback(error, null)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    listProduct,
    getProduct,
    deleteProduct
}