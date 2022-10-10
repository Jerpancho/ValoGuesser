export const reducer = (state, action) => {
    if (action.type === "UPDATE_COORDS") {
        const { x, y } = action.payload;
        // return new state updated
        return { ...state, mapClick: true, xCoords: x, yCoords: y };
    }
    if (action.type === "ROUND_CONFIRMED") {
        // calculate score here
        return { ...state, confirmed: true };
    }
    if (action.type === "NEXT_ROUND") {
        if (state.roundNumber < 5) {
            let nextRound = state.roundNumber + 1;
            return { ...state, roundNumber: nextRound, confirmed: false, mapClick: false, xCoords: 0, yCoords: 0 };
        }
        return { ...state };
    }
    throw new Error();
}