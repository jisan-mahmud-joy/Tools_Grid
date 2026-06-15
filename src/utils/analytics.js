// src/utils/analytics.js

import ReactGA from "react-ga4";

// Google Analytics Initialize
export const initGA = () => {
  ReactGA.initialize("G-XXXXXXXXXX");
};

// Track Page Views
export const pageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};