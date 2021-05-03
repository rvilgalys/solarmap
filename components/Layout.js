import LayoutHead from "./LayoutHead";

const Layout = ({ title = null, children }) => {
  return (
    <>
      <LayoutHead title={title ?? "Default Project Title"}></LayoutHead>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
