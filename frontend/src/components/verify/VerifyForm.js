import React, { useState } from 'react';
import {Button} from '..';
import axios from 'axios';
import './VerifyForm.css';

const VerifyForm = () => {
	const [ input, setInput ] = useState("");

	const handleInputChange = (event) => {
		const target = event.target;
		setInput({
			...input,
			[target.name] : target.value
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post("http://localhost:3001/user/verify", input)
		.then((res) => {
			if (res.data.message) {
				window.location.assign("/user/login");
			}
			else if (res.data.verified === false)
				window.location.assign("/user/verify");
		});
	}

	return (
		<div >
			<h1 className="form-header">Account verification</h1>
			<div className="verify-form">
			<form onSubmit={handleSubmit}>
				<input className="verify-input" name="email" type="email" placeholder="Email" value={input.email} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<input className="verify-input" name="otp" type="text" placeholder="Verification code" value={input.otp} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<Button type="submit" text="Verify"/>
			</form>
			</div>
		</div>
	)
}

export default VerifyForm;
