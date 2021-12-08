import React from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

import './Navbar.css'

const Navbar = (props) => {

	const loginStatus = props.setLoggedIn;
	const logout = () => {
		axios.get("http://localhost:3001/user/logout")
		.then((res) => {
			if (res.data.loggedIn === false) {
				loginStatus(false);
			}
			else
				console.log(res.data);
		});
	}

	if (props.loginStatus) {
		return (
			<div className="navbar">
				<NavLink to="/" className="navbar-item"><img src='/icons/home.png' alt="home"/></NavLink>
				<NavLink to="/notifications" className="navbar-item"><img src='/icons/notification.png' alt="notifications"/></NavLink>
				<NavLink to="/chat" className="navbar-item"><img src='/icons/chat.png' alt="chat"/></NavLink>
				<NavLink to="/profile" className="navbar-item"><img src='/icons/profile.png' alt="profile"/></NavLink>
				<NavLink to="/user/login" className="navbar-item" onClick={logout}>Log out</NavLink>
			</div>
		);
	}
	else if(!props.loginStatus) {
		return (
		<div className="navbar">
			<NavLink className="navbar-item" to="/user/login">Login</NavLink>
			<NavLink className="navbar-item" to="/user/register">Register</NavLink>
		</div>
		);
	}
}

export default Navbar;
