// app/page.tsx
import Venues from "./components/Venues";
import RootLayout from "./layout";
import Router from "next/router";
import React, { useEffect, useState } from "react";

export default function Home() {
  return (
    <RootLayout>
      <Venues router={undefined} />
    </RootLayout>
  );
}
