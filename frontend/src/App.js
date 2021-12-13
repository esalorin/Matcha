import React, { useState } from 'react';
import axios from 'axios';
import {Header} from './components';
import {Footer} from './components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Browse from './pages/Browse';
import './App.css';

const App = () => {

	const [ loggedIn, setLoggedIn] = useState();

	axios.defaults.withCredentials = true

	axios.get("http://localhost:3001/user/auth")
		.then((res) => {
			if (res.data.loggedIn === true) {
				setLoggedIn(true);
			}
			else
				setLoggedIn(false);

		});

	if (loggedIn){
		return (
			<div className="App">
				<Router>
					<Header loginStatus={loggedIn} />
					<Routes>
						<Route exact path='/' element={<Browse/>}/>
						<Route exact path='/user/register' element={<Register/>}/>
						<Route exact path='/chat' element={<Chat/>}/>
						<Route exact path='/profile' element={<Profile/>}/>
					</Routes>
					<Footer loginStatus={loggedIn}/>
				</Router>
			</div>
		);
	}

	else {
		return (
			<div className="App">
				<Router>
					<Header loginStatus={loggedIn}/>
					<Routes>
						<Route exact path='/' element={<Home/>}/>
						<Route exact path='/user/login' element={<Login />}/>
						<Route exact path='/user/register' element={<Register/>}/>
						<Route exact path='/user/verify' element={<Verify/>}/>
					</Routes>
					<Footer loginStatus={loggedIn}/>
				</Router>
			</div>
		);
	}
}

export default App;
