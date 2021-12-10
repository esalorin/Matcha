import React, { useState } from 'react';
import {Button} from '..';
import axios from 'axios';
import './Forms.css';

const RegisterForm = () => {
	const [ input, setInput ] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });
	const [ regStatus, setRegStatus] = useState("");

	axios.defaults.withCredentials = true

	const handleInputChange = (event) => {
		const target = event.target;
		setInput(
			{
				...input,
				[target.name]: target.value
			}
		);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post("http://localhost:3001/user/register", input)
		.then((res) => {
			if (res.data.message) {
				setRegStatus(res.data.message);
			}
			else if (res.data === 'Success')
				window.location.assign("/user/verify");
		});
	}

	return (
		<div >
			<h1 className="form-header">Register</h1>
			<div className="form-div">
				<p className="error-message">{regStatus}</p>
			<form onSubmit={handleSubmit}>
				<div className="register-names">
					<div>
						<input className="form-input" name="firstName" type="text" placeholder="First Name" value={input.firstName} onChange={(event) => handleInputChange(event)}></input>
					</div>
					<div>
						<input className="form-input" name="lastName" type="text" placeholder="Last Name" value={input.lastName} onChange={(event) => handleInputChange(event)}></input>
					</div>
				</div>
				<br/>
				<input className="form-input" name="username" type="text" placeholder="Username" value={input.username} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<input className="form-input" name="email" type="email" placeholder="Email" value={input.email} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<input className="form-input" name="password" type="password" placeholder="Password" value={input.password} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<Button type="submit" text="Register"/>
			</form>
			</div>
		</div>
	)
}

export default RegisterForm;
