import React from 'react';
import { Navbar } from '..';

import './Header.css'

const Header = () => {
	return (
		<section className="header">
			<section className="header-top">
				<section className="header-top_logo">
					<a href="/" className="header-logo">Matcha</a>
				</section>
				<section className="header-top_navbar">
					<Navbar />
				</section>
			</section>
		</section>
	)
}
export default Header;