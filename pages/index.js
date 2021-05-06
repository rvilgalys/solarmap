import Layout from "../components/Layout";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useState, useRef, useMemo } from "react";
import { getAreaOfPolygon } from "geolib";
import PlacesSearch from "../components/PlacesSearch";
import PolygonUI from "../components/PolygonUI";
import AreaDisplay from "../components/AreaDisplay";

const libraries = ["places"]; // prevents reloading of google maps

const Index = () => {
  // !! ######################################
  // !! ########### Hooks & Setup ###########
  // !! ######################################

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [colorMode, setColorMode] = useState("dark"); // dark, light
  const [isDrawing, setIsDrawing] = useState(false);

  // trivia: map center is Uluru, Australia
  const [mapCenter, setMapCenter] = useState({
    lat: -25.3444,
    lng: 131.0369,
  });

  const [paths, setPaths] = useState(null);
  const googleMapRef = useRef(null);
  const polygonRef = useRef(null);

  const area_m3 = useMemo(() => {
    if (!paths) return null;
    return getAreaOfPolygon(paths);
  }, [paths]);

  // !! ######################################
  // !! ########### Event Handlers ###########
  // !! ######################################

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
    if (!paths) {
      setPaths([{ lat: click.latLng.lat(), lng: click.latLng.lng() }]);
      return;
    }
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

  const handlePolygonEdit = () => {
    // triggers on mouseUp -- we defer to the state from Google Maps
    // & reset our own state to match

    if (!polygonRef.current) return;
    const nextPath = polygonRef.current
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

    setPaths(nextPath);
  };

  const handlePolygonLoad = (polygon) => {
    polygonRef.current = polygon;
    // previously we had event listeners in here
    // but they were superseded by the mouse up event anyway
  };

  // !! #################################
  // !! ########### Rendering ###########
  // !! #################################

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
                onMouseUp={handlePolygonEdit}
              ></Polygon>
            ) : null}
          </GoogleMap>
          <AreaDisplay
            className="mt-4"
            isAreaSelected={paths !== null && paths.length > 2}
            area_m3={area_m3}
          ></AreaDisplay>
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
