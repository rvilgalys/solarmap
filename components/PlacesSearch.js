import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

const PlacesSearch = ({ onPlaceSelect, className = "" }) => {
  if (!google) return null;
  const autoCompleteObj = useRef(null);

  const handlePlaceChanged = () => {
    const place = autoCompleteObj.current.getPlace();
    console.log("Place", place);
    const latLng = {};
    latLng.lat = place.geometry.location.lat();
    onPlaceSelect(place);
  };

  return (
    <label
      htmlFor="places-autocomplete"
      className={className + " w-3/4 sm:w-1/2 flex flex-col"}
    >
      <span>{"Location"}</span>
      <Autocomplete
        className="w-full"
        onLoad={(auto) => (autoCompleteObj.current = auto)}
        onPlaceChanged={handlePlaceChanged}
        types={["address"]}
      >
        <input
          name="places-autocomplete"
          className="w-full text-xl bg-white text-black p-2 shadow"
          placeholder="123 Awesome St..."
        ></input>
      </Autocomplete>
    </label>
  );
};

export default PlacesSearch;
