import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import http from "http";
import homeRoutes from "./routes/homeRoutes";

const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const server = new http.Server(app);
const MongoDBStore = require("connect-mongodb-session")(session);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export const mongo_uri = "mongodb://localhost:27017/intelect";
export const connect = mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use("/static", express.static("static"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		secret: process.env.SECRET_KEY,
		saveUninitialized: true,
		resave: true,
		store: new MongoDBStore({
			uri: "mongodb://localhost:27017/intelect",
			collection: "mySessions"
		})
	})
);
app.set("views", __dirname + "/views");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// app.get("/", (req,res) => {
// 	res.render("index.html");
// });
// app.get("/inputs", (req, res) => {
// 	res.render("index.html");
// });
// app.get("register", (req, res) => {
// 	res.render("index.html")
// })

// app.use("/auth", authRoutes);
// app.use("/doctor", docRoutes);
// app.use("/v1.0", agriRoutes);
app.use("/home", homeRoutes);





