import React, { useState, useEffect} from 'react';
import { FooterNavbar } from '..';

import './Footer.css'

const Footer = ({loginStatus}) => {
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
	if (isMobile) {
		return (
			<div className="footer">
					<div className="footer_navbar">
						<FooterNavbar loginStatus={loginStatus}/>}
					</div>
			</div>
		)
	}
	else {
		return (
			<></>
		)
	}
}
export default Footer;