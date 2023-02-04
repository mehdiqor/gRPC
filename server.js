const grpc = require("grpc");
const protoloader = require("@grpc/proto-loader");
const echoProto = protoloader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const {echoPackage} = echoDefinition
const serverURL = "localhost:5050"

function EchoUnary(call, callback){
    console.log("Call: ", call.request);
    callback(null, call)
}
function EchoServerStream(call, callback){
    for (let index = 0; index < 10; index++) {
        call.write({value : index})
    }
    call.on("end", error => {
        console.log("Error: ", error);
    })
}
function EchoClientStream(call, callback){
    call.on("data", data => {
        console.log(data);
    })
    call.on("end", error => {
        console.log(error);
    })
}
function BidiStream(call, callback){}

const server = new grpc.Server();
server.addService(echoPackage.EchoService.service, {
    EchoUnary,
    EchoServerStream,
    EchoClientStream,
    BidiStream
})
server.bind(serverURL, grpc.ServerCredentials.createInsecure());
console.log("runnig over localhost:5050");
server.start();