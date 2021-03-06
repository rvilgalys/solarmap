const SunIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
      strokeWidth="2"
      display="block"
      id="SunFill"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zM3.293 3.293a1 1 0 011.414 0l1 1a1 1 0 01-1.414 1.414l-1-1a1 1 0 010-1.414zm17.414 0a1 1 0 010 1.414l-1 1a1 1 0 11-1.414-1.414l1-1a1 1 0 011.414 0zM12 7a5 5 0 100 10 5 5 0 000-10zM1 12a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zm19 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM4.293 18.293a1 1 0 011.414 1.414l-1 1a1 1 0 01-1.414-1.414l1-1zm15 2.414l-1-1a1 1 0 011.414-1.414l1 1a1 1 0 01-1.414 1.414zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
      />
      <path d="M12 6a6 6 0 100 12 6 6 0 000-12z" />
    </svg>
  );
};

export default SunIcon;
