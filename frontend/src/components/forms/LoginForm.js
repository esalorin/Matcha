import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import {Button} from '..';
import axios from 'axios';
import './Forms.css';

const LoginForm = (props) => {
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
			if (res.data.loggedIn === true) {
				props.setLoggedIn(true);
			}
			else if (res.data.error) {
				setLoginStatus(res.data.error);
			}
			else if (res.data.verified === false)
				window.location.assign("/user/verify");
		});
	}

	if (props.loginStatus) {
		return <Navigate to='/' />
	}
	else if(!props.loginStatus) {
		return (
			<div >
				<h1 className="form-header">Login</h1>
				<div className="form-div">
					<p className="error-message">{loginStatus}</p>
				<form onSubmit={handleSubmit}>
					<input className="form-input" name="username" type="text" placeholder="Username" value={input.username} onChange={(event) => handleInputChange(event)}></input>
					<br/>
					<input className="form-input" name="password" type="password" placeholder="Password" value={input.password} onChange={(event) => handleInputChange(event)}></input>
					<br/>
					<Button type="submit" text="Login"/>
				</form>
				<Link className="forgot-password-link" to="">Forgot a password?</Link>
				</div>
			</div>
		);
	}
}

export default LoginForm;
