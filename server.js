// require("dotenv").config();
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");

var port = process.env.PORT || 3006;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(port);

console.log("App is listening on port " + port);