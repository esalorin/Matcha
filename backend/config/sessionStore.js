const MySQLStore = require('express-mysql-session');
require("dotenv").config();

var sessionStore = new MySQLStore({
	host			:	process.env.DB_HOST,
	user			:	process.env.DB_USER,
	password		:	process.env.DB_PASS,
	database		:	process.env.DB,
	port			:	3306
});

module.exports = sessionStore;
