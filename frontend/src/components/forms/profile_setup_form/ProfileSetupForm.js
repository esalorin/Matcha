import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../../index.js';
import '../Forms.css';
import MatchingInfo from './MatchingInfo.js';
import PersonInfo from './PersonInfo';
import PictureInfo from './PictureInfo.js';

const ProfileSetupForm = () => {
	const [page, setPage] = useState(0);
	const FormTitles = ["Dating information", "Tell us who you are", "Finally some pictures"];

	const DisplayPage = () => {
		if (page === 0) {
			return <MatchingInfo />;
		} else if (page === 1) {
			return <PersonInfo />;
		}
		else {
			return <PictureInfo />;
		}
	}

	return (
		<div className="profile-setup-form">
			<div className='form-header'>
				<h1>{FormTitles[page]}</h1>
			</div>
			<div className='progress-bar'>
				<div style={{backgroundColor: '#FF5B6F', width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%"}}></div>
			</div>
			<div className='form-div'>
				<div className='form-body'>{DisplayPage()}</div>
				<div className='form-footer'>
					<button className='button' type="button"
					disabled={page === 0}
					onClick={() => {
						setPage((currPage) => currPage - 1);}}>
							<p className="button-text">Previous</p>
					</button>
					<button className='button' type="button"
					disabled={page === 2}
					onClick={() => {
						setPage((currPage) => currPage + 1);}}>
							<p className="button-text">Next</p>
					</button>
				</div>
			</div>
		</div>
	);
}


export default ProfileSetupForm;
