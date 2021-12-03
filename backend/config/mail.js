const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
	host:	process.env.MAIL_HOST,
	secureConnection:	false,
	port:	process.env.MAIL_PORT,
	tls:{
		cciphers:	process.env.MAIL_TLS
	},
	auth:{
		user:	process.env.MAIL_USER,
		pass:	process.env.MAIL_PASS
	}
});

module.exports = transporter;
