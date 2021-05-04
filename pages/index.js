import Layout from "../components/Layout";
import { GoogleMap, useLoadScript, useGoogleMap } from "@react-google-maps/api";
import { useState, useRef, useMemo } from "react";
import PlacesSearch from "../components/PlacesSearch";

const libraries = ["places"]; // prevents reloading of google maps

const Index = () => {
  const [colorMode, setColorMode] = useState("dark"); // dark, light
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const googleMapRef = useRef(null);

  const handleColorModeChange = () => {
    setColorMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handlePlaceSelect = (place) => {
    if (!googleMapRef.current) return;

    googleMapRef.current.panTo(place.geometry.location);
    googleMapRef.current.setZoom(20);
  };

  const handleMapClick = (click) => {
    console.log(click);
  };

  return (
    <Layout
      title="The Solar Map"
      colorMode={colorMode}
      onColorModeChange={handleColorModeChange}
    >
      {loadError ? <span>{""}</span> : null}
      {isLoaded ? (
        <>
          <PlacesSearch onPlaceSelect={handlePlaceSelect}></PlacesSearch>
          <GoogleMap
            zoom={3}
            center={{
              lat: -3.745,
              lng: -38.523,
            }}
            mapContainerClassName="w-full h-96 mt-8 cursor-pointer"
            onLoad={(map) => (googleMapRef.current = map)}
            onClick={handleMapClick}
            mapTypeId={"hybrid"}
            clickableIcons={false}
            options={{
              draggableCursor: "crosshair",
            }}
          ></GoogleMap>
        </>
      ) : (
        <span className="text-xl border-b-2 border-red-500">
          Google maps is loading...
        </span>
      )}
    </Layout>
  );
};

export default Index;
