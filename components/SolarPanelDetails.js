import RangeInput from "./RangeInput";

const SolarPanelDetails = ({
  className,
  panelDimensions = { length: 164, width: 99 },
  onDimensionsChange,
  panelPower,
  onPowerChange,
}) => {
  return (
    <form
      className={
        className +
        " w-full sm:w-3/4 grid grid-cols-6 sm:grid-cols-12 gap-4 place-items-center p-4"
      }
      id="solar-panel-details"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2
        className={
          "col-span-6 sm:col-span-12 text-2xl font-display border-b w-full"
        }
      >
        {"Solar Panel Details"}
      </h2>
      <span className="col-span-6">
        {`1. Input your panel dimensions in centimeters. 
          The most common sizes are 164cm x 99cm for Residential 
          and 196cm x 99cm for Commercial.`}
      </span>
      <label htmlFor={"panel-length"} className="col-span-3 flex flex-col">
        <span>Length (cm)</span>
        <input
          name="panel-length"
          type="number"
          className="text-xl rounded w-3/4 text-gray-900"
          value={panelDimensions.length}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            onDimensionsChange({ length: value });
          }}
        ></input>
      </label>
      <label htmlFor={"panel-width"} className="col-span-3 flex flex-col">
        <span>Width (cm)</span>
        <input
          name="panel-width"
          type="number"
          className="text-xl rounded w-3/4 text-gray-900"
          value={panelDimensions.width}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            onDimensionsChange({ width: value });
          }}
        ></input>
      </label>
      <span className="col-span-6">{`2. What is the Nominal Power of your panel? 
      This is also called 'peak power' or 'power rating' 
      and is measured in Watts-Peak (Wp). Typical ranges are between 50 and 500 Watts.`}</span>
      <RangeInput
        value={panelPower}
        onChange={onPowerChange}
        min={50}
        max={500}
        step={5}
        name={"panel-nominal-power"}
        labelText={"NP (Watts)"}
        className="col-span-6 p-4"
      ></RangeInput>
    </form>
  );
};

export default SolarPanelDetails;
