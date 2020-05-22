import React from "react";
import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

function SEO({ title, description = "Basis Design System" }) {
  return (
    <HelmetProvider>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SEO;
