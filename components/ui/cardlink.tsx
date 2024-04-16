"use client";

import React from "react";
import { useRouter } from "next/router"; // import useRouter

export const CardLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
};
