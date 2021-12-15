import React from "react";

function MatchingInfo() {
	return (
		<div>
			<label for="age">Enter your age: </label>
			<input className="form-input age" name="age" id="age" type="number" min="18" max="120" placeholder="Age"></input>
			<br/>
			<label for="gender">Select your gender: </label>
			<select name="gender" id="gender">
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<br/>
			<br/>
			<label for="sexuality">Select your sexuality: </label>
			<select name="sexuality" id="sexuality">
				<option value="heterosexual">Heterosexual</option>
				<option value="homosexual">Homosexual</option>
				<option value="bisexual">Bisexual</option>
				<option value="bisexual">None of your business</option>
			</select>
			<br/>
		</div>
	);
}

export default MatchingInfo;
