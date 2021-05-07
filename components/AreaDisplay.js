const AreaDisplay = ({
  className = "",
  area_m3 = 1000,
  isAreaSelected = false,
}) => {
  // render fuction to handle large areas ->
  // uses km^2 and scientific notation where appropriate

  const renderReadableArea = (area) => {
    const unit = area > 1000 ? "kilometer" : "meter";
    const number = area > 1000 ? area / 1000 : area;
    const options = {
      notation: area > 1_000_000_000 ? "scientific" : "standard",
      style: "unit",
      unit,
      unitDisplay: "short",
      maximumFractionDigits: 1,
    };
    return (
      <span className="ml-2 text-2xl font-display">
        {number.toLocaleString("en-US", options)}
        <sup>2</sup>
      </span>
    );
  };

  return (
    <div className={className}>
      {isAreaSelected ? (
        <>
          <span>{"Area of Selected Shape:"}</span>
          {renderReadableArea(area_m3)}
        </>
      ) : (
        <span>No area is selected.</span>
      )}
    </div>
  );
};

export default AreaDisplay;
