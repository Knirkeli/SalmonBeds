// app/LandingLayout.tsx
import React from "react";
import LandingNavbar from "./components/LandingNavbar"; // replace with your actual LandingNavbar component
import LandingFooter from "./components/LandingFooter"; // replace with your actual LandingFooter component

const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <LandingNavbar />
    {children}
    <LandingFooter />
  </>
);

export default LandingLayout;
