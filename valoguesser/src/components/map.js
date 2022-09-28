import React from 'react'
import { useFetchData } from '../util/hooks/useFetchData';
const Map = ({ map_uid, x, y, handleCoords, map, click, confirmed, xActual, yActual, gameOver = false, roundHistory }) => {
    const { isLoading, data, error } = useFetchData(`http://localhost:4646/map/${map_uid}`);
    return (
        error ?
            <svg className="map-container"><text x={250} y={250}>no map found</text></svg>
            :
            !isLoading &&
            <svg className="map-container" onMouseDown={handleCoords} ref={map}>
                <image href={confirmed || gameOver ? data.callout_img : data.base_img} height="500" width="500" />
                {click && (
                    <circle cx={x} cy={y} r="5" stroke="black" strokeWidth="1" fill="blue" />
                )}
                {confirmed && <>
                    <circle cx={xActual} cy={yActual} r="5" stroke="black" strokeWidth="1" fill="green" />
                    <line x1={x} y1={y} x2={xActual} y2={yActual} stroke="black" />
                </>}
                {/*display history if game is over instead of chosen map*/}
                {
                    gameOver &&
                    roundHistory.map((item) => {
                        return (<g key={item.item_uid}>
                            <circle cx={item.x_chosen} cy={item.y_chosen} r="5" stroke='black' fill='blue' />
                            <circle cx={item.x_coord} cy={item.y_coord} r="5" stroke="black" fill="green" />
                            <line x1={item.x_chosen} y1={item.y_chosen} x2={item.x_coord} y2={item.y_coord} stroke="black" />
                        </g>);
                    })
                }
            </svg>

    )
}

export default Map;