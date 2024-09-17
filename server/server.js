const express = require("express");
const body_parser = require("body-parser");
const user_routers = require("./routers/user_routers");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(body_parser.json());


app.use("/db/users",user_routers);

const PORT = 5000;
app.listen(PORT,() =>{console.log(`server running on port ${PORT}`)});