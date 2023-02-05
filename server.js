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
    const list = [];
    call.on("data", data => {
        list.push(data)
        console.log("Server: ", data);
    })
    call.on("end", error => {
        console.log("list: ", list);
        console.log(error);
    })
}
function dateTime(call, callback){
    call.on("data", data => {
        console.log("Server DateTime: ", data);
        call.write({value : new Date().toLocaleString()})
    })
    call.on("end", error => {
        console.log("Error: ", error);
    })
}

const server = new grpc.Server();
server.addService(echoPackage.EchoService.service, {
    EchoUnary,
    EchoServerStream,
    EchoClientStream,
    dateTime
})
server.bind(serverURL, grpc.ServerCredentials.createInsecure());
console.log("runnig over localhost:5050");
server.start();