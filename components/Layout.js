import LayoutHead from "./LayoutHead";
import LayoutHeader from "./LayoutHeader";

const Layout = ({
  title = null,
  children,
  colorMode = "dark",
  onColorModeChange,
}) => {
  const colorModeClassName = colorMode === "dark" ? "dark-mode" : "light-mode";

  return (
    <div
      id="background-wrapper"
      className={colorModeClassName + " w-screen h-screen overflow-auto pb-24"}
    >
      <LayoutHead title={title ?? "Default Project Title"}></LayoutHead>
      <LayoutHeader
        colorMode={colorMode}
        onColorModeChange={onColorModeChange}
      ></LayoutHeader>
      <main className="w-full mt-8 flex flex-col items-center">{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
