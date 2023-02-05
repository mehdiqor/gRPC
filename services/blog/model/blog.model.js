const { default: mongoose, model } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    id : {type : Number},
    title : {type : String},
    text : {type : String},
});
BlogSchema.pre("save", function(next){
    const self = this;
    self.constructor.count(async function(err, data){
        if(err) return next(err)
        self.set({id : (data + 1)})
        next();
    })
});
module.exports = {
    BlogModel : mongoose.model("blog", BlogSchema)
}