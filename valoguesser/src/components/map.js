import React from 'react'

const map = ({ coords, handleCoords, map, click }) => {
    return (
        <svg className="map-container" onMouseDown={handleCoords} ref={map}>
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

export default map