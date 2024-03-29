"use client";

import { FC, useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { ChromePicker } from "react-color";
import { io } from "socket.io-client";
import { drawLine } from "@/utils/drawLine";
const socket = io("http://localhost:3001");

interface PageProps {}

type DrawLineProps = Draw & {
  color: string;
};

const Page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready"); //when a new client connects , get the current canvas state for him (see server logic)

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return; //toDataURL will convert the canvas state into a URL which will be emitted to the new client added
      //     console.log(canvasRef.current?.toDataURL())
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      console.log("I received the state");
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color });
      }
    );

    socket.on("clear", clear);

    // clean-up , turn off the sockets
    return () => {
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    };
  }, [canvasRef]);

  //object notation{} for function arguments, cuz the order of arguments won't matter in this case
  //function drawLine(prevPoint, currentPoint, ctx) -> here the order of arguments matters
  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={() => socket.emit("clear")}
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

export default Page;
