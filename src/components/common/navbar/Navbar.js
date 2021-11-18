import React from 'react';
import {  Link } from "react-router-dom";

import './Navbar.css'

const Navbar = () => {

	return (
		<section className="navbar">
			{/*<a href="/" className="navbar-item"><img src='/icons/home.png' alt="home"/></a>
			<a href="/notifications" className="navbar-item"><img src='/icons/notification.png' alt="notifications"/></a>
			<a href="/chat" className="navbar-item"><img src='/icons/chat.png' alt="chat"/></a>
			<a href="/profile" className="navbar-item"><img src='/icons/profile.png' alt="profile"/></a> 
			<a href="/login" className="navbar-item" onClick={logout}>Log out</a>*/}
			<Link to="/login" className="navbar-item" >Login</Link>
			<Link to="/register" className="navbar-item" >Register</Link>
		</section>
	);
}

export default Navbar;
