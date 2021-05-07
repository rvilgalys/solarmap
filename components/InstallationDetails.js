const InstallationDetails = ({
  totalNominalPower_kW,
  totalNumberPanels,
  className = "",
}) => {
  // uses scientific notation where appropriate for large kWp

  const renderReadableNumber = (number, unit = "") => {
    const options = {
      notation: number > 1_000_000_000 ? "scientific" : "standard",
      maximumFractionDigits: 0,
    };
    return (
      <span className="ml-2 text-2xl font-display">
        {number.toLocaleString("en-US", options)}
        {unit ? " " + unit : ""}
      </span>
    );
  };

  return (
    <div
      className={
        className +
        " w-full sm:w-3/4 grid grid-cols-6 gap-4 place-items-center p-4"
      }
    >
      <h2 className="col-span-6 text-2xl font-display border-b w-full">
        {"Installation Details"}
      </h2>
      <span className="w-full col-span-6 p-4 bg-gray-800 text-gray-100">
        {`These numbers are estimated based on a rough area 
          calculation. If you have an unusual shape drawn, 
          it's possible that the number of panels that could 
          fit would be less than what's esimated.`}
      </span>
      <span className="col-span-6 text-xl w-full">
        {"Total Number of Panels:"}
        {renderReadableNumber(totalNumberPanels)}
      </span>
      <span className="col-span-6 text-xl w-full">
        {"Nominal Power of Installation:"}
        {renderReadableNumber(totalNominalPower_kW, "kWp")}
      </span>
    </div>
  );
};

export default InstallationDetails;
