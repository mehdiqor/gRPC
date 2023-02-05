const { BlogModel } = require("../model/blog.model")

async function createBlog(call, callback){
    try {
        const {title, text} = call.request;
        await BlogModel.create({title, text});
        callback(null, {status : "Created"})
    } catch (error) {
        callback(error, null)
    }
}
async function updateBlog(call, callback){
    try {
        const {id} = call.request;
        const data = call.request;
        delete data.id;
        const result = await BlogModel.updateOne({id}, {$set : data});
        if(result.modifiedCount == 0) return callback({message  : "Not Updated"}, null);
        callback(null, {status : "Updated"});
    } catch (error) {
        callback(error, null)
    }
}
async function listBlog(call, callback){
    try {
        const blogs = await BlogModel.find({})
        callback(null, {blogs})
    } catch (error) {
        callback(error, null)
    }
}
async function getBlog(call, callback){
    try {
        const {id} = call.request;
        const blogs = await BlogModel.findOne({id});
        callback(null, blogs)
    } catch (error) {
        callback(error, null)
    }
}
async function deleteBlog(call, callback){
    try {
        const {id} = call.request;
        const result = await BlogModel.deleteOne({id});
        if(result.deletedCount == 0) return callback({message  : "Not Deleted"}, null);
        callback(null, {status : "Deleted"})
    } catch (error) {
        callback(error, null)
    }
}

module.exports = {
    createBlog,
    updateBlog,
    listBlog,
    getBlog,
    deleteBlog
}