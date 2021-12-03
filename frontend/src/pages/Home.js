import React from 'react';
import '../App.css';

const Home = () => {
	const homePageStyle = {
		width: "100%",
		height: "calc(100vh - 100px)",
		backgroundColor: "#FF5B6F",
		textAlign: "center",
		paddingTop: "100px",
		color: "white"
	  };
	return (
		<div style={homePageStyle}>
			<h1>Hey you!</h1>
			<h2>Start using Matcha today and find love!</h2>
			<h3>Login / register to start looking for company.</h3>
			<div style={{marginTop: "15vh"}}><img className="App-logo" src='/icons/matcha-white.png' alt="matcha-logo"/></div>
		</div>
	)
}

export default Home;
