export const reducer = (state, action) => {
    if (action.type === "UPDATE_COORDS") {
        const { x, y } = action.payload;
        // return new state updated
        return { ...state, mapClick: true, xCoords: x, yCoords: y };
    }

    return false;
}