const grpc = require("grpc");
const protoloader = require("@grpc/proto-loader");
const echoProto = protoloader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const {echoPackage} = echoDefinition;
const serverURL = "localhost:5050";

const client = new echoPackage.EchoService(serverURL, grpc.credentials.createInsecure());
const echoData = {
    value : "my echo value"
}
client.EchoUnary(echoData, (error, response) => {
    if(error) return console.log("Error: ", error.message);
    console.log("Response: ", response);
});

const serverStream = client.EchoServerStream();
serverStream.on("data", (data) => {
    console.log(data);
});
serverStream.on("end", (error) => {
    console.log("Error: ", error);
});

const echoes = [
    {value : "value1"},
    {value : "value2"},
    {value : "value3"},
    {value : "value4"},
]
const clientStream = client.EchoClientStream();
for (let index = 0; index < echoes.length; index++) {
    clientStream.write(echoes[index])
}
clientStream.on("data", data => {
    console.log(data);
});
clientStream.on("end", error => {
    console.log(error);
});