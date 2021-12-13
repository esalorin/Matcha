const Profile = require("../models/Profile");

exports.getProfile = async (req, res, next) => {
	const data = {
		user_id : req.session.user_id
	};

	const profile = new Profile(data);

	let profileData = await profile.getProfile();
	let tags = await profile.getTags();
	if (profileData.length > 0)
	{
		res.send({profile: profileData, tags: tags});
	}
	else
		res.send("Moooo");
}
