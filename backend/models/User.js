const pool = require("../config/db");

class User {
	constructor(data) {
		this.username = data.username || "";
		this.email = data.email || "";
		this.firstName = data.firstName || "";
		this.lastName = data.lastName || "";
		this.hashPass = data.hashPass || "";
		this.verified = data.verify || "0";
		this.otp = data.otp || null;
	}

	async insertNewUser() {
		let sql = `
		INSERT INTO users (username, email, fname, lname, password, verified, otp)
		VALUES(
			'${this.username}',
			'${this.email}',
			'${this.firstName}',
			'${this.lastName}',
			'${this.hashPass}',
			'0',
			'${this.otp}'
		)`;

		const [newUser, _] = await pool.execute(sql);

		return newUser;
	}

	async findUsersByUnameAndEmail() {
		let sql = `
		SELECT * FROM users WHERE
		username = '${this.username}' OR
		email = '${this.email}'`;

		const [users, _] = await pool.execute(sql);

		return users;
	}

	async findUsersByEmailAndOtp() {
		let sql = `
		SELECT * FROM users
		WHERE email = ?
		AND otp = ?
		AND verified = '0'`;

		const [user, _] =  await pool.execute(sql, [this.email, this.otp]);
		return user;
	}

	async setVerified() {
		let sql = `
		UPDATE users
		SET verified = '1', otp = NULL
		WHERE email = ?`;

		await pool.execute(sql, [this.email]);
	}

	async selectUser() {
		let sql = `
		SELECT a.*, b.active
		FROM users a JOIN profiles b
		WHERE a.user_id = b.user_id
		AND username = ?`;

		const [user, _] = await pool.execute(sql, [this.username]);
		return user;
	}

	async initProfile(user_id) {

		let sql = `INSERT INTO profiles (user_id) SELECT users.user_id FROM users WHERE users.email = ?`;

		const [newProfile, _] = await pool.execute(sql, [this.email]);

		return newProfile;
	}

}

module.exports = User;
