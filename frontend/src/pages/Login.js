import React from 'react';
import { LoginForm } from '../components';

const Login = (props) => {
	return (
		<div>
			<LoginForm loginStatus={props.loginStatus} setLoggedIn={props.setLoggedIn} />
		</div>
	)
}

export default Login;