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
			<Route path='/login' exact component={Login}/>
			<Route path='/register' component={Register}/>
		</Routes>
	  </Router>
  </div>
)

export default App;
