const User = require("../models/User");
const helper = require("../helpers/userHelper");
const bcrypt = require("bcrypt");
const mail = require("../config/mail");
//const express = require("express");
//const session = require("express-session");
//const app = express();

exports.registerUser = async (req, res, next) => {

	//	Data object for user input
	const data = {
		firstName	:	req.body.firstName.trim(),
		lastName	:	req.body.lastName.trim(),
		username	:	req.body.username.trim(),
		email		:	req.body.email.trim(),
		password	:	req.body.password.trim(),
		hashPass	:	"",
		otp			:	helper.data.generateOtp()
	};

	//	Validates user input
	let output = helper.data.registerValidation(data);

	//	Validation returns 1 if all information is valid, otherwise it returns 	//	error message
	if (output == 1) {
		var salt = bcrypt.genSaltSync(10)
		data.hashPass = bcrypt.hashSync(data.password, salt);

		const user = new User(data);
		let result = await user.findUsersByUnameAndEmail();

		if (result.length !== 0) {
			res.send({ message: "Email or username already taken"});
		}

		result = await user.insertNewUser();
		if (result) {
			var mailOptions = {
				from: '"Matcha" matcha.app.no-reply@outlook.com',
				to: data.email,
				subject: 'Account verification',
				text: 'Hi ' + data.username + '!\n Thanks for signing up!\n You can find the account verification code below. \n' + data.otp +
				'\nOr you can use this link to finish registration: ' +
				'http://localhost:3001/user/verify?email=' + data.email + '&code=' + data.otp
				};

				mail.sendMail(mailOptions, function(error, info){
				if (error) {
					console.error(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
				});
			res.send("Success");
		}

	}
	else
		res.send({ message: output});
}

exports.verifyGetUser = async (req, res, next) => {
	const data = {
		email : req.query.email,
		otp : req.query.code
	}

	const user = new User(data);

	if (data.email.length === 0 || data.otp.length !== 10)
		res.redirect('http://localhost:3000/')
	else {
		let result = await user.findUsersByEmailAndOtp();
		if (result.length === 1) {
			await user.setVerified();
			res.redirect("http://localhost:3000/user/login");
		}
		else {
			res.redirect('http://localhost:3000/');
		}
	}
}

exports.verifyPostUser = async (req, res, next) => {
	const data = {
		email	:	req.body.email.trim() || "",
		otp		:	req.body.otp.trim() || ""
	}

	const user = new User(data);

	if (data.email.length === 0 || data.otp.length !== 10)
		res.redirect('http://localhost:3000/')
	else {
		let result = await user.findUsersByEmailAndOtp();
		if (result.length === 1) {
			await user.setVerified();
			res.send({message:"Verified"});
		}
		else {
			res.send({verified:false});
		}
	}
}


exports.loginUser = async (req, res, next) => {
	const data = {
		username : req.body.username.trim(),
		password : req.body.password.trim(),
	};

	let user = new User(data);
	const result = await user.selectUser();

	if (result.length === 1) {
		bcrypt.compare(data.password, result[0].password, (err, response) => {
			if (response) {
				if (result.length === 1 && result[0].verified === "1") {
					req.session.user = result[0];
					res.send({message: "loggedIn", loggedIn: true});
				}
				else {
					res.send({verified: false});
				}
			}
			else {
				res.send({ error : "Wrong username or password"});
			}
		});
	}
	else {
		res.send({ error: "Wrong username or password"});
	}
}

exports.loginGetUser = (req, res, next) => {
	if (req.session.user)
		res.send({loggedIn:true});
}

exports.registerGetUser = (req, res, next) => {
	if (req.session.user)
		res.send({loggedIn:true});
}

