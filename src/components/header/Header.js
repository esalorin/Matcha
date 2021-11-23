import React from 'react';
import { Navbar } from '..';
import { Link } from "react-router-dom";

import './Header.css'

const Header = () => {
	return (
		<div className="header">
			<div className="header-top">
				<div className="header-top_logo">
					<Link to="/" className="header-logo"><img src='/icons/matcha.png' alt="matcha-logo"/> Matcha</Link>
					{/*<div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>*/}
				</div>
				<div className="header-top_navbar">
					<Navbar />
				</div>
			</div>
		</div>
	)
}
export default Header;