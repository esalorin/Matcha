import React from 'react';
import './Button.css'

const Button = ({text}) => {
	return (
		<button className="button">
			<p className="button-text">{text}</p>
		</button>
	)
}

export default Button;