import React, {useState} from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';


function MatchingInfo() {
	const [address, setAddress] = useState("");
	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null
	});

	const handleInputChange = (event) => {
		setAddress(event);
	}
	
	const handleSelect = async (value) => {
		const result = await geocodeByAddress(value);
		const latLng  = await getLatLng(result[0]);
		setAddress(value);
		setCoordinates(latLng);
		console.log(latLng);
		console.log(value);

	}

	return (
		<div>
			<label for="age">Enter your age: </label>
			<input className="form-input age" name="age" id="age" type="number" min="18" max="120" placeholder="Age"></input>
			<br/>
			<label for="gender">Select your gender: </label>
			<select name="gender" id="gender">
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<br/>
			<br/>
			<label for="sexuality">Select your sexuality: </label>
			<select name="sexuality" id="sexuality">
				<option value="heterosexual">Heterosexual</option>
				<option value="homosexual">Homosexual</option>
				<option value="bisexual">Bisexual</option>
				<option value="bisexual">None of your business</option>
			</select>
			<br/>
			<br/>
			<label for="location">Enter your location (optional): </label>
			<PlacesAutocomplete value={address} onChange={(event) => handleInputChange(event)} onSelect={handleSelect}>
				{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
					<div className="location-div">
						<input {...getInputProps({placeholder: "Search Places ..."})}className="form-input" name="location" id="location" type="text"></input>
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
