import React from "react";
import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Seo({ title, description = "Basis Design System" }) {
  return (
    <HelmetProvider>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Seo;
