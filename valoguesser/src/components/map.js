import React from 'react'
import { useFetchData } from '../util/hooks/useFetchData';
const Map = ({ map_uid, x, y, handleCoords, map, click, confirmed, xActual, yActual }) => {
    const { isLoading, data, error } = useFetchData(`http://localhost:4646/map/${map_uid}`)
    return (
        !isLoading &&
        (<svg className="map-container" onMouseDown={handleCoords} ref={map} style={{ backgroundImage: `url(${confirmed ? data.callout_img : data.base_img})`, backgroundSize: "cover" }}>
            {click && (
                <circle
                    cx={x}
                    cy={y}
                    r="5" //radius
                    stroke="black"
                    strokeWidth="1"
                    fill="blue"
                />
            )}
            {confirmed && <>
                <circle
                    cx={xActual}
                    cy={yActual}
                    r="5" //radius
                    stroke="black"
                    strokeWidth="1"
                    fill="green"
                />
                <line x1={x} y1={y} x2={xActual} y2={yActual} stroke="black" />
            </>
            }
        </svg>)
    )
}

export default Map