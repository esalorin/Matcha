import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

import './Navbar.css'

const HeaderNavbar = ({loginStatus}) => {

	const [windowDimension, setWindowDimension] = useState(null);

	useEffect(() => {
		setWindowDimension(window.innerWidth);
	}, []);

	useEffect(() => {
		function handleResize() {
		setWindowDimension(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = windowDimension <= 640;

	axios.defaults.withCredentials = true
	const logout = () => {
		axios.get("http://localhost:3001/user/logout")
		.then((res) => {
			if (res.data.loggedIn === false) {
				window.location.assign('/user/login');
			}
			else
				console.log(res.data);
		});
	}

	if (loginStatus) {
		return (
			<div className="navbar">
				{isMobile ? <>
				<NavLink to="/user/settings" className="navbar-item" ><img src='/icons/settings.png' alt="settings"/></NavLink>
				<NavLink to="/user/login" className="navbar-item" onClick={logout}><img src='/icons/logout.png' alt="logout"/></NavLink></>
				:
				<>
				<NavLink to="/" className="navbar-item"><img src='/icons/home.png' alt="home"/></NavLink>
				<NavLink to="/notifications" className="navbar-item"><img src='/icons/notification.png' alt="notifications"/></NavLink>
				<NavLink to="/chat" className="navbar-item"><img src='/icons/chat.png' alt="chat"/></NavLink>
				<NavLink to="/profile" className="navbar-item"><img src='/icons/profile.png' alt="profile"/></NavLink>
				<NavLink to="/user/settings" className="navbar-item" ><img src='/icons/settings.png' alt="settings"/></NavLink>
				<NavLink to="/user/login" className="navbar-item" onClick={logout}><img src='/icons/logout.png' alt="logout"/></NavLink></>}
			</div>
		);
	}
	else if(!loginStatus) {
		return (
		<div className="navbar">
			<NavLink className="navbar-item" to="/user/login">Login</NavLink>
			<NavLink className="navbar-item" to="/user/register">Register</NavLink>
		</div>
		);
	}
}

export default HeaderNavbar;
