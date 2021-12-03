import React from 'react';
import { NavLink } from "react-router-dom";

import './Navbar.css'

const Navbar = () => {

	return (
		<div className="navbar">
			{/*<NavLink to="/" className="navbar-item"><img src='/icons/home.png' alt="home"/></NavLink>
			<NavLink to="/notifications" className="navbar-item"><img src='/icons/notification.png' alt="notifications"/></NavLink>
			<NavLink to="/chat" className="navbar-item"><img src='/icons/chat.png' alt="chat"/></NavLink>
			<NavLink to="/profile" className="navbar-item"><img src='/icons/profile.png' alt="profile"/></NavLink>
			<NavLink to="/login" className="navbar-item" onClick={logout}>Log out</NavLink>*/}
			<NavLink className="navbar-item" to="/user/login">Login</NavLink>
			<NavLink className="navbar-item" to="/user/register">Register</NavLink>
		</div>
	);
}

export default Navbar;
