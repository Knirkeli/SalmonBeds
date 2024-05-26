// app/page.tsx
import Venues from "./components/Venues";
import RootLayout from "./layout";
import React from "react";

export default function Home() {
  return (
    <RootLayout>
      <Venues />
    </RootLayout>
  );
}
