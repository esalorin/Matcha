import React, {useState} from 'react';
import axios from 'axios';
import { LoginForm } from '../components';

const Login = () => {
	const [loginStatus, setLoginStatus] = useState(true);

	axios.get("http://localhost:3001/user/auth")
		.then((res) => {
			if (res.data.loggedIn === true) {
				window.location.assign('/');
			}
			else {
				setLoginStatus(false);
			}
	});

	if (loginStatus) {
		return (
			<div >
			</div>
		)
	}
	else {
		return (
			<div>
				<LoginForm />
			</div>
		)
	}
}

export default Login;