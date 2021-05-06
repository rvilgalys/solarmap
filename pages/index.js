import Layout from "../components/Layout";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useState, useRef, useCallback } from "react";
import PlacesSearch from "../components/PlacesSearch";
import PolygonUI from "../components/PolygonUI";

const libraries = ["places"]; // prevents reloading of google maps

const Index = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [colorMode, setColorMode] = useState("dark"); // dark, light
  const [isDrawing, setIsDrawing] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [paths, setPaths] = useState(null);
  const googleMapRef = useRef(null);
  const polygonRef = useRef(null);

  const handleColorModeChange = () => {
    setColorMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handlePlaceSelect = (place) => {
    if (!googleMapRef.current) return;

    googleMapRef.current.panTo(place.geometry.location);
    googleMapRef.current.setZoom(20);
    setMapCenter(place.geometry.location);
  };

  const handleMapClick = (click) => {
    if (!isDrawing) return;
    if (!paths)
      setPaths([{ lat: click.latLng.lat(), lng: click.latLng.lng() }]);
    setPaths((prev) => [
      ...prev,
      { lat: click.latLng.lat(), lng: click.latLng.lng() },
    ]);
  };

  const handleMapLoad = (map) => {
    googleMapRef.current = map;

    // setting some map options --
    // sometimes <GoogleMap> would fail to set these properly
    map.setMapTypeId("hybrid"); // satellite imagery w/ data overlay
    map.setTilt(0); // better w/ 2D shapes
  };

  const handlePolygonLoad = (polygon) => {
    polygonRef.current = polygon;

    // challenge here is to sync imperative Google Maps vs. declarative React State

    // google.maps.event.addListener -> polygon.getPaths()
    // listen for 'insert_at', 'set_at'
    // possible duplicate events fired for 'insert at'
    // https://codesandbox.io/s/reactgooglemapsapi-editing-a-polygon-popr2
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
          <PolygonUI
            isDrawing={isDrawing}
            onDrawToggle={() => setIsDrawing((prev) => !prev)}
            onClearShape={() => setPaths(null)}
            className="mt-8"
          ></PolygonUI>
          <GoogleMap
            zoom={3}
            center={mapCenter}
            mapContainerClassName="w-full h-96 mt-2 shadow"
            onLoad={handleMapLoad}
            onClick={handleMapClick}
            clickableIcons={false}
            options={{
              draggableCursor: "crosshair",
            }}
          >
            {paths ? (
              <Polygon
                paths={paths}
                editable={true}
                onLoad={handlePolygonLoad}
              ></Polygon>
            ) : null}
          </GoogleMap>
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
