import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Button} from '..';
import axios, { Axios } from 'axios';
import './LoginForm.css';

const LoginForm = () => {
	const [ input, setInput ] = useState({ username: "", password: "" })
	const [ loginStatus, setLoginStatus ] = useState("");

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
		axios.post("http://localhost:3001/user/login", input)
		.then((res) => {
			if (res.data.message === "loggedIn") {
				window.location.assign("/");
			}
			else if (res.data.error) {
				setLoginStatus(res.data.error);
			}
			else if (res.data.verified === false)
				window.location.assign("/user/verify");
		});
	}

	useEffect(() => {
		axios.get("http://localhost:3001/user/login")
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
			<h1 className="form-header">Login</h1>
			<div className="login-form">
				<p className="error-message">{loginStatus}</p>
			<form onSubmit={handleSubmit}>
				<label >Username:</label>
				<br/>
				<input className="login-form-input" name="username" type="text" value={input.username} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<label >Password:</label>
				<br/>
				<input className="login-form-input" name="password" type="password" value={input.password} onChange={(event) => handleInputChange(event)}></input>
				<br/>
				<Button type="submit" text="Login"/>
			</form>
			<Link className="forgot-password-link" to="">Forgot a password?</Link>
			</div>
		</div>
	)
}

export default LoginForm;
