import React, { useState, useEffect } from 'react';
import {Button} from '..';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
	const [ input, setInput ] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });
	const [ regStatus, setRegStatus] = useState("");

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

	useEffect(() => {
		axios.get("http://localhost:3001/user/register")
		.then((res) => {
			if (res.data.loggedIn === true) {
				window.location.assign("/");
			}
			else
				console.log(res.data);
		});
	}, []);


	return (
		<div >
			<h1 className="form-header">Register</h1>
			<div className="register-form">
				<p className="error-message">{regStatus}</p>
			<form onSubmit={handleSubmit}>
				<div className="register-names">
					<div>
						<label >First Name:</label>
						<br/>
						<input className="register-form-input" name="firstName" type="text" value={input.firstName} onChange={(event) => handleInputChange(event)}></input>
					</div>
					<div>
						<label >Last Name:</label>
						<br/>
						<input className="register-form-input" name="lastName" type="text" value={input.lastName} onChange={(event) => handleInputChange(event)}></input>
					</div>
				</div>
				<label >Username:</label>
				<br/>
				<input className="register-form-input" name="username" type="text" value={input.username} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<label >Email:</label>
				<br/>
				<input className="register-form-input" name="email" type="email" value={input.email} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<label >Password:</label>
				<br/>
				<input className="register-form-input" name="password" type="password" value={input.password} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<Button type="submit" text="Register"/>
			</form>
			</div>
		</div>
	)
}

export default RegisterForm;
