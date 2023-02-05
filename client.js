const grpc = require("grpc");
const protoloader = require("@grpc/proto-loader");
const echoProto = protoloader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const {echoPackage} = echoDefinition;
const serverURL = "localhost:5050";

//unary
const client = new echoPackage.EchoService(serverURL, grpc.credentials.createInsecure());
const echoData = {
    value : "my echo value"
}
client.EchoUnary(echoData, (error, response) => {
    if(error) return console.log("Error: ", error.message);
    console.log("Response: ", response);
});

//server stream
const serverStream = client.EchoServerStream();
serverStream.on("data", (data) => {
    console.log(data);
});
serverStream.on("end", (error) => {
    console.log("Error: ", error);
});

//client stream
const echoes = [
    {value : "value1"},
    {value : "value2"},
    {value : "value3"},
    {value : "value4"},
]
const clientStream = client.EchoClientStream(null, (err, res) => {
    console.log(res);
});
let index = 0;
setInterval(function(){
    clientStream.write(echoes[index])
    index++
    if(index == echoes.length){
        clientStream.end();
        clearInterval(this)
    }
}, 300)

//dateTime
const dateTime = client.dateTime();
setInterval(() => {
    dateTime.write({value : new Date().toLocaleString()})
}, 1000);
dateTime.on("data", data => {
    console.log("Client DateTime: ", data);
})