import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

/**
 * Actual Page Header
 */
const LayoutHeader = ({ colorMode = "dark", onColorModeChange }) => {
  return (
    <header className="w-full p-4 flex items-center topo-bg">
      <button
        ariaLabel="dark-light-mode-toggle"
        type="button"
        className="rounded-full bg-brand-900 p-2"
        onClick={onColorModeChange}
      >
        {colorMode === "dark" ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>}
      </button>
      <h1 className="ml-4 text-3xl p-2 font-display">The Solar Map</h1>
    </header>
  );
};

export default LayoutHeader;
