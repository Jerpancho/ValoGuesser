import React, { useState, useEffect, useCallback } from "react";
import Map from "./map";
import { useNavigate } from "react-router-dom";
const Gameover = ({ map_uid, roundHistory }) => {
	const navigate = useNavigate();
	const [finalScore, setFinalScore] = useState(0);

	const calculateFinalScore = useCallback(() => {
		let finalScoreAmount = 0;
		roundHistory.forEach((item) => {
			finalScoreAmount += item.score;
		});

		return finalScoreAmount;
	}, [roundHistory]);

	useEffect(() => {
		sessionStorage.setItem('isPlaying', false);
		let finalScoreOfGame = calculateFinalScore();
		setFinalScore(finalScoreOfGame);
	}, [calculateFinalScore]);
	return (
		<div className="game-over">
			<Map
				map_uid={map_uid}
				click={false}
				confirmed={false}
				gameOver={true}
				roundHistory={roundHistory}
			/>
			<div className="final-score">
				{finalScore}/25000
			</div>
			<div className="redirect-buttons">
				<button
					onClick={() => {
						sessionStorage.setItem('isPlaying', true);
						window.location.reload();
					}}
				>
					Play Again
				</button>
				<button onClick={() => {
					navigate("/map");
				}}>MapSelect</button>
			</div>
		</div>
	);
};

export default Gameover;
