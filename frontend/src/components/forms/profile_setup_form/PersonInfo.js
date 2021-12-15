import React from "react";

function PersonalInfo() {
	return(
		<div>
			<label for="tags">Choose maximum of 5 interest tags: </label>
			<input className="form-input" name="tags" id="tags" type="text" placeholder="search for tags"></input>
			<br/>
			<label for="bio">Write yourself a bio: </label>
			<textarea className="form-input" name="bio" id="bio"></textarea>
			<br/>
		</div>
	);
}

export default PersonalInfo;
