const pool = require("../config/db");

class Profile {
	constructor(data) {
		this.user_id = data.user_id;
		this.gender = data.gender || "";
		this.sexual_preference = data.sexual_preference || "";
		this.age = data.age || "";
		this.location = data.location || "";
		this.fame_rating = data.fame_rating || "";
		this.bio = data.bio || "";
		this.active = data.active || "0";
	}

	async getProfile() {
		let sql = `
		SELECT a.*, b.username, b.fname, b.lname
		FROM profiles a JOIN users b
		WHERE a.user_id = ? AND a.user_id = b.user_id
		`;

		const [profile, _] =  await pool.execute(sql, [this.user_id]);
		return profile;

	}

	async getTags() {
		let sql = `
		SELECT a.tag FROM tags a
		JOIN tags_in_use b
		WHERE a.tag_id = b.tag_id AND b.user_id = ?
		`;

		const [tags, _] =  await pool.execute(sql, [this.user_id]);
		return tags;
	}


}

module.exports = Profile;
