import React from 'react'
import { useFetchData } from '../util/hooks/useFetchData';
const Map = ({ map_uid, x, y, handleCoords, map, click, confirmed, xActual, yActual }) => {
    const { isLoading, data, error } = useFetchData(`http://localhost:4646/map/${map_uid}`);
    return (
        error ? 
            <svg className="map-container"><text x={250} y={250}>no map found</text></svg> 
        : 
        !isLoading &&
            <svg className="map-container" onMouseDown={handleCoords} ref={map}>
                <image href={confirmed ? data.callout_img : data.base_img} height="500" width="500"/>
                {click && (
                    <circle cx={x} cy={y} r="5" stroke="black" strokeWidth="1" fill="blue"/>
                )}
                {confirmed && <>
                    <circle cx={xActual} cy={yActual} r="5" stroke="black" strokeWidth="1" fill="green"/>
                    <line x1={x} y1={y} x2={xActual} y2={yActual} stroke="black" />
                </>}
            </svg>

    )
}

export default Map;