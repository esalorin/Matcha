import React, { useState, useEffect} from 'react';
import { Navbar } from '..';
import { Link } from "react-router-dom";

import './Header.css'

const Header = ({loginStatus}) => {
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
	return (
		<div className="header">
			<div className="header-top">
				<div className="header-top_logo">
					<Link to="/" className="header-logo"><img src='/icons/matcha.png' alt="matcha-logo"/> {isMobile ? "" : "Matcha"}</Link>
					{/*<div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>*/}
				</div>
				<div className="header-top_navbar">
					<Navbar loginStatus={loginStatus} />
				</div>
			</div>
		</div>
	)
}
export default Header;