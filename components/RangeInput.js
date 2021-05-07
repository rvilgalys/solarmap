import { Range } from "react-range";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * Utility wrapper for the react-range component. Includes an input.
 */
const RangeInput = ({
  className = "",
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  name = "",
  labelText = "label",
  onChange,
}) => {
  const handleSliderChange = (value) => {
    onChange(value);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // there's a small issue here where the value isn't properly clamped
    // causing the slider to bounce around while typing
    // to fix we could use a second stateful value that's updated to newValue onBlur
    onChange(newValue);
  };

  return (
    <div className={className + " w-full flex items-center justify-between"}>
      <Range
        step={step}
        min={min}
        max={max}
        values={[value]}
        onChange={handleSliderChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className={props.className + " w-full h-4 bg-gray-500 rounded"}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className={" w-10 h-10 bg-brand-900 rounded-full"} />
        )}
      ></Range>
      <label htmlFor={name} className="flex flex-col ml-4">
        <span className="text-sm">{labelText}</span>
        <input
          className="w-20 text-gray-900 rounded"
          type="number"
          value={value}
          onChange={handleInputChange}
        ></input>
      </label>
    </div>
  );
};

export default RangeInput;
