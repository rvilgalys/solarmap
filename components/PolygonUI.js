const PolygonUI = ({
  className = "",
  isDrawing = false,
  onDrawToggle,
  onClearShape,
}) => {
  return (
    <div className={className + " w-full flex items-center justify-end"}>
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
