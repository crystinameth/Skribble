type DrawLineProps = Draw & {
    color: string
}

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  color,
}: DrawLineProps) => {
  const { x: currX, y: currY } = currentPoint;
  const lineColor = color;
  const lineWidth = 5;

  let startPoint = prevPoint ?? currentPoint; //initializes the startPoint variable with either the prevPoint if it exists or the currentPoint if prevPoint is null or undefined. The ?? operator is the nullish coalescing operator, which returns the right-hand operand (currentPoint in this case) when the left-hand operand (prevPoint) is null or undefined.
  ctx.beginPath(); //This line starts a new path on the canvas. Paths are used to draw shapes or lines.
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x, startPoint.y); //moves the drawing cursor to the specified coordinates (startPoint.x, startPoint.y) without drawing anything.
  ctx.lineTo(currX, currY); // draws a line from the current cursor position (set by moveTo) to the coordinates (currX, currY), effectively drawing the line.
  ctx.stroke(); //This line actually draws the stroke (line) based on the previous settings such as color and width.

  ctx.fillStyle = lineColor; //sets the fill color for shapes that will be filled on the canvas.
  ctx.beginPath(); //starts a new path for drawing shapes.
  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI); //draws a filled circle (arc) at the coordinates (startPoint.x, startPoint.y) with a radius of 2 pixels.
  ctx.fill(); //fills the circle (arc) with the specified fill color
};
