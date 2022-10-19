import React, { useEffect, useRef } from "react";

const ProgressBar = ({ amount = 1234, total = 5000 }) => {
	const progressFillRef = useRef(document.querySelector(":root"));

	useEffect(() => {
		const newAmount = Math.floor((amount / total) * 100);
		progressFillRef.current.style.setProperty("--progress", `${newAmount}%`);
	}, [amount, total]);
	return (
		<div className="progress">
			<div className="progress-fill"></div>
		</div>
	);
};
export default ProgressBar;
