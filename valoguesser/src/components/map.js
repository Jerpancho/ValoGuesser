import React, { useEffect, useState, useCallback } from "react";
import { useFetchData } from "../util/hooks/useFetchData";
import { calculateRandomPointInCircle } from '../util/gameUtils/calculateCircle';
const Map = ({
	map_uid,
	x,
	y,
	handleCoords,
	map,
	click,
	confirmed,
	xActual,
	yActual,
	gameOver = false,
	roundHistory,
	time,
	timeout
}) => {
	const { isLoading, data, error } = useFetchData(
		`http://localhost:4646/map/${map_uid}`
	);
	const [randomPoint, setRandomPoint] = useState(null);
	const [randomRadius, setRandomRadius] = useState(250);
	// every new round calculate a circle for the given coordinate
	// the circle should be randomly around the actual coordinates
	useEffect(() => {
		console.log("effect restarted");
		// resets the radius every time
		setRandomRadius(250);
		setRandomPoint(calculateRandomPointInCircle(xActual, yActual, 100));
	}, [xActual, yActual]);

	// every x amount of seconds (1 or 2 or 5) after the 15 second mark
	// make the circle radius smaller
	// another useEffect here
	const reduceRadius = useCallback(() => {
		setRandomRadius((prev) => prev - 5);
	}, []);
	useEffect(() => {
		if (time < 10) {
			reduceRadius();
		}
	}, [time, reduceRadius]);
	return error ? (
		<svg className="map-container">
			<text x={250} y={250}>
				no map found
			</text>
		</svg>
	) : (
		!isLoading && (
			<svg className="map-container" onMouseDown={handleCoords} ref={map}>
				<image
					id="map-image"
					href={confirmed || gameOver ? data.callout_img : data.base_img}
					height="500"
					width="500"
				/>
				<text x="30" y="30">{time}</text>
				{!gameOver && time <= 15 && <circle cx={randomPoint.x} cy={randomPoint.y} r={randomRadius} fill='none' stroke='white' />}
				{click && !timeout && (
					<circle
						cx={x}
						cy={y}
						r="5"
						stroke="black"
						strokeWidth="1"
						fill="blue"
					/>
				)}
				{confirmed && (
					<>
						<circle
							cx={xActual}
							cy={yActual}
							r="5"
							stroke="black"
							strokeWidth="1"
							fill="green"
						/>
						{!timeout && <line x1={x} y1={y} x2={xActual} y2={yActual} stroke="black" />}
					</>
				)}
				{/*display history if game is over instead of chosen map*/}
				{gameOver &&
					roundHistory.map((item) => {
						return (
							<g key={item.item_uid}>
								{!item.timedOut && <circle
									cx={item.x_chosen}
									cy={item.y_chosen}
									r="5"
									stroke="black"
									fill="blue"
								/>}
								<circle
									cx={item.x_coord}
									cy={item.y_coord}
									r="5"
									stroke="black"
									fill="green"
								/>
								{!item.timedOut && <line
									x1={item.x_chosen}
									y1={item.y_chosen}
									x2={item.x_coord}
									y2={item.y_coord}
									stroke="black"
								/>}
							</g>
						);
					})}
			</svg>
		)
	);
};

export default Map;
