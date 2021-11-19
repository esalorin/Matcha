import React from 'react';
import {Header} from './components/common';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const App = () => (
	<div className="App">
		<Router>
			<Header />
			<Routes>
				<Route exact path='/login' element={<Login/>}/>
				<Route exact path='/register' element={<Register/>}/>
				<Route exact path='/home' element={<Login/>}/>
				<Route exact path='/chat' element={<Register/>}/>
				<Route exact path='/profile' element={<Login/>}/>
			</Routes>
		</Router>
	</div>
)

export default App;
