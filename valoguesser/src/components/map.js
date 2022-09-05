import React from 'react'

const Map = ({ x, y, handleCoords, map, click, confirmed, xActual, yActual }) => {
    let url = "https://assets.rockpapershotgun.com/images/2020/06/Ascent-Callouts.png";
    return (
        <svg className="map-container" onMouseDown={handleCoords} ref={map} style={{ backgroundImage: `url(${url})`, backgroundSize: "cover" }}>
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
        </svg>
    )
}

export default Map