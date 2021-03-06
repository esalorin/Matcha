const User = require("../models/User");
const helper = require("../helpers/userHelper");
const bcrypt = require("bcrypt");
const mail = require("../config/mail");

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
			if (result[0].email == data.email)
				res.send({ message: "This email is already registered" });
			else
				res.send({ message: "This username is already taken" });

		}
		else {
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
			await user.initProfile(result.user_id);
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
			await user.initProfile(result.user_id);
			res.send({verified:true});
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
					req.session.user = result[0].username;
					req.session.user_id = result[0].user_id;
					if (result[0].active === "1")
						res.send({ loggedIn: true, profileActive: true});
					else
						res.send({ loggedIn: true, profileActive: false});
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


exports.authUser = (req, res, next) => {
	if (req.session.user) {
		res.send({loggedIn:true});
	}
	else
		res.send({loggedIn: false});
}

exports.logOut = (req, res, next) => {
	if (req.session.user) {
		req.session.destroy(function(err) {
			if (err) {
				console.log(err);
				res.send({loggedIn: true});
			}
			else
				res.clearCookie("userId");
				res.send({loggedIn: false});

		  })
	}
	else
		res.end();
}
