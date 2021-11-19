import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Button} from '..';
import './LoginForm.css';

const LoginForm = () => {
	const [ input, setInput ] = useState({ username: "", password: "" })

	const handleInputChange = (event) => {
		const target = event.target;
		setInput(
			{
				...input,
				[target.name]: target.value
			}
		);
	}

	return (
		<div >
			<h1 className="form-header">Login</h1>
			<div className="login-form">
			<form>
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
			<Link to="">Forgot a password?</Link>
			</div>
		</div>
	)
}

export default LoginForm;