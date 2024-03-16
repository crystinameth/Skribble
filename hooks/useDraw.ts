import { useEffect, useRef } from "react";

export const useDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
        console.log({ x: e.clientX, y: e.clientY })
    }

    // get coordinates(x,y) relative to the canvas
    

    // Add event listeners
    canvasRef.current?.addEventListener('mousemove', handler)

    // Remove event listeners
    return () => canvasRef.current?.addEventListener('mousemove', handler)
  }, []); //empty dependency array, we want this useEffect to be executed once

  return { canvasRef };
};
