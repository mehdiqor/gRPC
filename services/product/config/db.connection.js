const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery', true);
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/grpc-nodejs")
.then(() => console.log("Connected to DB!"))
.catch(err => console.log("ERROR: ", err.message))