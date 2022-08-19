import React from 'react'

const Map = ({ coords, handleCoords, map, click }) => {
    let url = "https://assets.rockpapershotgun.com/images/2020/06/Ascent-Callouts.png";
    return (
        <svg className="map-container" onMouseDown={handleCoords} ref={map} style={{ backgroundImage: `url(${url})`, backgroundSize: "cover" }}>
            {click && (
                <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="5" //radius
                    stroke="black"
                    strokeWidth="1"
                    fill="blue"
                />
            )}
        </svg>
    )
}

export default Map