import React, {useState} from 'react';
import axios from 'axios';
import { VerifyForm } from '../components';

const Verify = () => {
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
		return(
			<div>
				<VerifyForm/>
			</div>
		)
	}
}

export default Verify;