import { Range } from "react-range";

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
  return (
    <div className={className + " w-full flex items-center justify-between"}>
      <Range
        step={step}
        min={min}
        max={max}
        values={[value]}
        onChange={onChange}
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
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};

export default RangeInput;
