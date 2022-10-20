// the circle calculation must not pinpoint the actual coordinate and therefore must be random
export function calculateRandomPointInCircle(xCenter, yCenter, radius) {
   // radius should almost always be 200 / 2 = 100;
   let theta = Math.random() * 2 * Math.PI;
   let R = radius * Math.sqrt(Math.random());

   let x = Math.floor(xCenter + R * Math.cos(theta));
   let y = Math.floor(yCenter + R * Math.sin(theta));
   return { x, y };
};
