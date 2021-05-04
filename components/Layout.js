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
      className={colorModeClassName + " w-screen h-screen overflow-auto"}
    >
      <LayoutHead title={title ?? "Default Project Title"}></LayoutHead>
      <LayoutHeader
        colorMode={colorMode}
        onColorModeChange={onColorModeChange}
      ></LayoutHeader>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
