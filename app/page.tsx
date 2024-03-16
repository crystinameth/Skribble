"use client";

import { FC } from "react";
import { useDraw } from "@/hooks/useDraw";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { canvasRef } = useDraw(drawLine);

  //object notation{} for function arguments, cuz the order of arguments won't matter in this case
  //function drawLine(prevPoint, currentPoint, ctx) -> here the order of arguments matters
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "#000";
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default page;
