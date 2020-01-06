import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function SEO({ title, description = "Basis Design System" }) {
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default SEO;
