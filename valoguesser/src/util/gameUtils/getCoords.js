export const getCoords = (e, ref) => {
    let pos = ref.current.getBoundingClientRect();
    let newX = e.clientX - Math.floor(pos.left);
    let newY = e.clientY - Math.floor(pos.top);
    return [newX, newY];
};