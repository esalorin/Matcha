import React, { useState } from "react";
import "./ProfilePictures.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";


const ProfilePictures = () => {

	const [slideIndex, setSlideIndex ] = useState(1);

	const nextSlide = () => {
		if (slideIndex !== dataSlider.length) {
			setSlideIndex(slideIndex + 1);
		}
		else if (slideIndex === dataSlider.length){
			setSlideIndex(1);
		}
	}

	const previousSlide = () => {
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1);
		}
		else if (slideIndex === 1){
			setSlideIndex(dataSlider.length);
		}
	}

	const moveDot = index => {
		setSlideIndex(index);
	}

	return (
		<div className="slider-container">
			{dataSlider.map((obj, index) => {
				return (
					<div
					key={obj.id}
					className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
						<img
							src={process.env.PUBLIC_URL + `/images/img${index + 1}.jpg`}
							alt="Profile pictures"
						/>
					</div>
				)
			})}
			<BtnSlider moveSlide={nextSlide} direction={"next"}/>
			<BtnSlider moveSlide={previousSlide} direction={"previous"}/>
			<div className="container-dots">
				{Array.from({length: dataSlider.length}).map((item, index) => {
					return (
						<div
						key={index}
						onClick={() => moveDot(index + 1)}
						className={slideIndex === index + 1 ? "dot active" : "dot"}
						></div>
					)
				})}
			</div>

		</div>
	);
}

export default ProfilePictures;
