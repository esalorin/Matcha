import React from 'react';
import { Navbar } from '..';

import './Header.css'

const Header = () => {
	return (
		<div className="header">
			<div className="header-top">
				<div className="header-top_logo">
					<a href="/" className="header-logo">Matcha</a>
				</div>
				<div className="header-top_navbar">
					<Navbar />
				</div>
			</div>
		</div>
	)
}
export default Header;