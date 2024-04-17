// app/LandingLayout.tsx
import React from "react";
import LandingNavbar from "./components/LandingNavbar";
import LandingFooter from "./components/LandingFooter";

const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <LandingNavbar />
    {children}
    <LandingFooter />
  </>
);

export default LandingLayout;
