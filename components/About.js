const About = ({ className = "" }) => {
  return (
    <article className={className + " "}>
      <span>
        The Solar Map is a small project that calculates the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Nominal_power_(photovoltaic)"
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-blue-400"
        >
          Nominal Power
        </a>{" "}
        of a solar installation. To get started, enter an address below and use
        the Draw Shape tool (D) to outline a suitable area.
      </span>
    </article>
  );
};

export default About;
