require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouter = require("../routes/userRoutes");
const profileRouter = require("../routes/profileRoutes");
const { response } = require("express");
const sessionStore = require("../config/sessionStore");

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
		secret: "Matcha dating site made by eena & karri and some eXtra safety 4109248OAFsdfjf94fa",
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

// Routes
app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(port, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("App listening on port: "+port);
});
