const LayoutFooter = () => {
  return (
    <footer className="w-full p-4 flex items-center justify-end topo-bg mt-24">
      <span className="self-end">
        This page was created by{" "}
        <a
          className="underline text-blue-400"
          href="https://rim.works/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Rim Vilgalys
        </a>{" "}
        in May 2021.
      </span>
    </footer>
  );
};

export default LayoutFooter;
