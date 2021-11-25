const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const saltRounds = bcrypt.genSalt(10);

const pool = mysql.createPool({
	connectionLimit	:	100,
	host			:	process.env.DB_HOST,
	user			:	process.env.DB_USER,
	password		:	process.env.DB_PASS,
	database		:	process.env.DB,
	debug			:	false,
	port			:	3306
});

const register = require("../helpers/register");
const { response } = require("express");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.send("Hello World!");
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

app.post("/register", (req, res) => {
	//	Data object for user input
	const data = {
		firstName	:	req.body.firstName.trim(),
		lastName	:	req.body.lastName.trim(),
		username	:	req.body.username.trim(),
		email		:	req.body.email.trim(),
		password	:	req.body.password.trim()
	};

	//	Validates user input
	var output = register.data.registerValidation(data);

	//	Validation returns 1 if all information is valid, otherwise it returns 	//	error message
	if (output == 1) {
		//	MySQL query to check if username or password is already taken
		pool.query("SELECT * FROM users WHERE username = ? OR email = ?",
		[data.username, data.email], (err, result) => {
			if (err) {
				console.error(err);
				return;
			}
			else if (result.length !== 0) {
				res.send("Email or username already taken");
			}
			else {
				//	At this point all data is valid and user can be registered. //	First we hash te password and then we insert data to db
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(data.password, salt, (err, hash) => {

						if (err) {
							console.error(err);
						}

						pool.query(
							"INSERT INTO users (username, email, fname, lname, password, verified) VALUES(?, ?, ?, ?, ?, ?)",
							[data.username, data.email, data.firstName, data.lastName, hash, '0'], (err, result) => {
								if (err) {
									console.error(err);
									return;
								}

								var mailOptions = {
									from: 'youremail@gmail.com',
									to: 'myfriend@yahoo.com',
									subject: 'Sending Email using Node.js',
									text: 'That was easy!'
								  };
								  
								  transporter.sendMail(mailOptions, function(error, info){
									if (error) {
									  console.log(error);
									} else {
									  console.log('Email sent: ' + info.response);
									}
								  });

								res.send("Success!");
							});
						});
					});
				}
			});
	}
	else
		res.send(output);
});

app.post("/login", (req, res) => {
	const username = req.body.username.trim();
	const password = req.body.password.trim();

	pool.query(
		"SELECT * FROM users WHERE username = ?",
		username, (err, result) => {
			if (err) {
				console.error(err);
				return;
			}

			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, result) => {
					if (result) {
						res.send("Logged in");
					}
					else {
						res.send("Wrong username or password");
					}
				});
			}
			else {
				res.send("User doesn't exist");
			}
		}
	);
});

app.listen(port, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("App listening on port: "+port);
});
