const { AllRoutes } = require("./routes/index.routes");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(AllRoutes);
app.listen(4000, () => {
    console.log("Client running overport 4000");
});