import Layout from "../components/Layout";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

const Index = () => {
  const [colorMode, setColorMode] = useState("dark"); // dark, light

  const handleColorModeChange = () => {
    console.log("asdfasdf");
    setColorMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Layout
      title="The Solar Map"
      colorMode={colorMode}
      onColorModeChange={handleColorModeChange}
    ></Layout>
  );
};

export default Index;
