"use client";

import { FC, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { ChromePicker } from "react-color";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  //object notation{} for function arguments, cuz the order of arguments won't matter in this case
  //function drawLine(prevPoint, currentPoint, ctx) -> here the order of arguments matters
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
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
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={clear}
        >
          Clear canvas
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default page;
