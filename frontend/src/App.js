import React from 'react';
import {Header} from './components';
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
  return (
	<div className="App">
		<Router>
			<Header />
			<Routes>
				<Route exact path='/' element={<Home/>}/>
				<Route exact path='/login' element={<Login/>}/>
				<Route exact path='/register' element={<Register/>}/>
				<Route exact path='/verify' element={<Verify/>}/>
				{/* This when logged in:
				<Route exact path='/' element={<Browse/>}/>
				<Route exact path='/chat' element={<Chat/>}/>
				<Route exact path='/profile' element={<Profile/>}/>*/}
			</Routes>
		</Router>
	</div>
)}

export default App;
