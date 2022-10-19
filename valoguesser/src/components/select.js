import React, { useEffect } from "react";
import SelectList from "./selectList";

const Select = () => {
	// this list should be taken from an api with proper unique ids
	useEffect(() => {
		sessionStorage.setItem('isPlaying', false);
	}, []);
	return (
		<div className="app">
			<header className="app-header">
				<h1> Map Selection</h1>
			</header>
			<main>
				<SelectList />
			</main>
		</div>
	);
};

export default Select;
