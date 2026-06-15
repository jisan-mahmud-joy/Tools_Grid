// src/utils/analytics.js

import ReactGA from "react-ga4";

// Google Analytics Initialize
export const initGA = () => {
  ReactGA.initialize("G-MWM6TVQKT6");
};

// Track Page Views
export const pageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};