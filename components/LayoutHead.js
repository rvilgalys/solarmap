import Head from "next/head";
/**
 * HTML Header
 */
const LayoutHead = ({ title = "Default Project Title" }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        type="image/png"
        href="favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="favicon-16x16.png"
        sizes="16x16"
      />
      <meta property="og:title" content=""></meta>
      <meta property="og:description" content=""></meta>
      <meta property="og:image" content=""></meta>
      <meta property="og:url" content=""></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
    </Head>
  );
};

export default LayoutHead;
