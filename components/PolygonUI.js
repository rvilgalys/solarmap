import { useEffect } from "react";

const PolygonUI = ({
  className = "",
  isDrawing = false,
  onDrawToggle,
  onClearShape,
}) => {
  useEffect(() => {
    // adding hotkeys -- triggers on keyup to avoid repeats on hold
    document.addEventListener("keyup", (event) => {
      // avoid triggering on regular inputs
      if (event.isComposing) {
        return;
      }

      if (event.code === "KeyD") {
        onDrawToggle();
      }
      if (event.code === "KeyC") {
        onClearShape();
      }
    });
  }, []);

  return (
    <div className={className + " w-full flex items-center justify-end"}>
      <div className="flex flex-col mr-4 text-sm">
        <span>Draw Shape (D): Draw your installation on the map.</span>
        <span>Clear Shape (C): Clear current drawing.</span>
      </div>
      <button
        className={
          "text-xl font-display mr-4 p-1 border-b" +
          (isDrawing
            ? " text-green-600 bg-black border-transparent"
            : " text-auto")
        }
        onClick={onDrawToggle}
      >
        {"Draw Shape"}
      </button>
      <button
        onClick={onClearShape}
        className={
          "text-xl font-display mr-4 text-yellow-500 p-1 border-b border-yellow-500"
        }
      >
        {"Clear Shape"}
      </button>
    </div>
  );
};

export default PolygonUI;
