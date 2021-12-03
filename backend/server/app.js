const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const userRouter = require("../routes/userRoutes");

const { response } = require("express");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
	credentials: true

}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
	session({
		key: "userId",
		secret: "startmatching",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 24 * 60 * 60 * 1000,
		},
	})
);

var nodemailer = require('nodemailer');

app.use("/user", userRouter);

app.get("/", (req, res) => {
	res.send("yessiir");
})

app.listen(port, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("App listening on port: "+port);
});
