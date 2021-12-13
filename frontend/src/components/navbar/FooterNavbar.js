import React from 'react';
import { NavLink } from "react-router-dom";

import './Navbar.css'

const FooterNavbar = ({loginStatus}) => {

	if (loginStatus) {
		return (
			<div className="footer-navbar">
				<NavLink to="/" className="footer-navbar-item"><img src='/icons/home.png' alt="home"/></NavLink>
				<NavLink to="/chat" className="footer-navbar-item"><img src='/icons/chat.png' alt="chat"/></NavLink>
				<NavLink to="/notifications" className="footer-navbar-item"><img src='/icons/notification.png' alt="notifications"/></NavLink>
				<NavLink to="/profile" className="footer-navbar-item"><img src='/icons/profile.png' alt="profile"/></NavLink>
			</div>
		);
	}
	else if(!loginStatus) {
		return (
		<div className="navbar">
		</div>
		);
	}
}

export default FooterNavbar;