import React from "react";

function PersonalInfo({formData, setFormData}) {
	return(
		<div>
			<label htmlFor="tags">Choose maximum of 5 interest tags: </label>
			<input className="form-input" name="tags" id="tags" type="text" placeholder="search for tags" value={formData.tag1} onChange={(event) => setFormData({
				...formData, tag1: event.target.value
			})}></input>
			<br/>
			<label htmlFor="bio">Write yourself a bio: </label>
			<textarea className="form-textarea" placeholder="I really love writing bios! <3" maxLength={500} name="bio" id="bio" value={formData.bio} onChange={(event) => setFormData({
				...formData, bio: event.target.value
			})}></textarea>
			<br/>
		</div>
	);
}

export default PersonalInfo;
