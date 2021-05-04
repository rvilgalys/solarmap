import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

const LayoutHeader = ({ colorMode = "dark", onColorModeChange }) => {
  return (
    <header className="w-full p-4 flex items-center">
      <button
        type="button"
        className="rounded-full bg-brand-900 p-2"
        onClick={onColorModeChange}
      >
        {colorMode === "dark" ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>}
      </button>
      <h1 className="ml-4 text-3xl">The Solar Map</h1>
    </header>
  );
};

export default LayoutHeader;
