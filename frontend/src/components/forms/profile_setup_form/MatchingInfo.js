import React, {useState} from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';


function MatchingInfo({formData, setFormData}) {

	const handleInputChange = (event) => {
		setFormData({
			...formData, location: event, lat: "", lng: ""
		});
	}

	const handleSelect = async (value) => {
		const result = await geocodeByAddress(value);
		const latLng  = await getLatLng(result[0]);
		setFormData({
			...formData, location: value, lat: latLng.lat, lng: latLng.lng
		});

	}

	const handleAge = (event) => {
		setFormData({
			...formData, age: event.target.value
		})
	}

	return (
		<div>
			<label htmlFor="age">Enter your age: </label>
			<div className="age-container">
				<input type="range" min="18" max="120" className="slider" value={formData.age} onChange={handleAge}></input>
				<input className="form-input age" name="age" id="age" type="number" min="18" max="120" placeholder="Age" value={formData.age} onChange={handleAge}></input>
			</div>
			<br/>
			<label htmlFor="gender">Select your gender: </label>
			<select name="gender" id="gender" value={formData.gender} onChange={(event) => setFormData({
				...formData, gender: event.target.value
			})}>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<br/>
			<br/>
			<label htmlFor="sexuality">Select your sexuality: </label>
			<select name="sexuality" id="sexuality" value={formData.sexuality} onChange={(event) => setFormData({
				...formData, sexuality: event.target.value
			})}>
				<option value="heterosexual">Heterosexual</option>
				<option value="homosexual">Homosexual</option>
				<option value="bisexual">Bisexual</option>
				<option value="other">None of your business</option>
			</select>
			<br/>
			<br/>
			<label htmlFor="location">Enter your location (optional): </label>
			<PlacesAutocomplete value={formData.location} onChange={(event) => handleInputChange(event)} onSelect={handleSelect}>
				{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
					<div className="location-div">
						<input {...getInputProps({placeholder: "Search Places ..."})}className="form-input" name="location" id="location" type="text" >
					</input>
						<div className="locations-dropdown">
							{loading ? <div>...loading</div>:null}

							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active ? "#FF5B6F": "white",
									textAlign: "center",
									minHeight:"30px",
									borderBottom: "1px solid rgb(238, 238, 238)",
									cursor: "pointer"
								};

								return (<div {...getSuggestionItemProps(suggestion, {style})}>
									{suggestion.description}
									</div>)
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	);
}

export default MatchingInfo;
