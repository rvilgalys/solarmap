import Layout from "../components/Layout";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useState, useRef, useMemo } from "react";
import { getAreaOfPolygon } from "geolib";
import About from "../components/About";
import PlacesSearch from "../components/PlacesSearch";
import PolygonUI from "../components/PolygonUI";
import AreaDisplay from "../components/AreaDisplay";
import SolarPanelDetails from "../components/SolarPanelDetails";
import InstallationDetails from "../components/InstallationDetails";

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
  const [panelDimensions_cm, setPanelDimensions_cm] = useState({
    length: 164,
    width: 99,
  });
  const [panelNominalPower_W, setPanelNominalPower_W] = useState(350);

  // trivia: map center is Uluru, Australia
  const [mapCenter, setMapCenter] = useState({
    lat: -25.3444,
    lng: 131.0369,
  });

  const [paths, setPaths] = useState(null);
  const googleMapRef = useRef(null);
  const polygonRef = useRef(null);

  // !! ###################################################
  // !! ########### Memoized Values (Biz Logic) ###########
  // !! ###################################################

  const area_m3 = useMemo(() => {
    if (!paths) return null;
    return getAreaOfPolygon(paths);
  }, [paths]);

  const areaOfPanel_m3 = useMemo(() => {
    return (panelDimensions_cm.length / 100) * (panelDimensions_cm.width / 100);
  }, [panelDimensions_cm]);

  const totalNumberPanels = useMemo(() => {
    if (!area_m3) return null;
    return Math.floor(parseInt(area_m3) / parseInt(areaOfPanel_m3));
  }, [area_m3, areaOfPanel_m3]);

  const totalNominalPower_kW = useMemo(() => {
    if (!totalNumberPanels) return null;
    // in an ideal world this would use a packing algorithm
    // a good halfway measure would be to brute force test at different angles
    // for the purposes here, we're just going to work out the total area / panel dimensions

    return (totalNumberPanels * panelNominalPower_W) / 1000;
  }, [totalNumberPanels, panelNominalPower_W]);

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

  const handleDimensionsChange = (newDimensions) => {
    setPanelDimensions_cm((prev) => ({ ...prev, ...newDimensions }));
  };

  const handlePanelPowerChange = (newValue) => {
    setPanelNominalPower_W(newValue);
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
          <About className="mt-4 w-full sm:w-1/2"></About>
          <PlacesSearch
            className="mt-4"
            onPlaceSelect={handlePlaceSelect}
          ></PlacesSearch>
          <PolygonUI
            isDrawing={isDrawing}
            onDrawToggle={() => setIsDrawing((prev) => !prev)}
            onClearShape={() => setPaths(null)}
            className="mt-8 p-4 sm:p-2"
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
          <SolarPanelDetails
            className="mt-4"
            panelDimensions={panelDimensions_cm}
            onDimensionsChange={handleDimensionsChange}
            panelPower={panelNominalPower_W}
            onPowerChange={handlePanelPowerChange}
          ></SolarPanelDetails>
          {totalNominalPower_kW ? (
            <InstallationDetails
              className="mt-4"
              totalNominalPower_kW={totalNominalPower_kW}
              totalNumberPanels={totalNumberPanels}
            ></InstallationDetails>
          ) : null}
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
