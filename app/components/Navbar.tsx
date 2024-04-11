"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="flex items center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/sblogo.png" alt="Logo" width={100} height={50} />
            <h1 className="text-2xl md:text-4xl font-bold ml-4">
              Salmon <span className="text-primary">Beds</span>
            </h1>
          </div>
        </Link>
        <nav className="flex gap-12 lg:flex 2xl:ml-16 mt-auto">
          {links.map((link, idx) => (
            <div
              key={idx}
              className={
                idx === 0 || idx === links.length - 1
                  ? "hidden lg:flex"
                  : "flex"
              }
            >
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-grey-600 transition duration-100 hover:text-blue-500"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex divide-x border-r sm:border-l">
          {/* <Link href="/cart">
            <Button
              variant={"default"}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-34 md:w-24 round"
            >
              <ShoppingCart />
              <span className="text-xs font-semibold sm:block">
                Cart {isClient ? `(${totalItems})` : ""}
              </span>
            </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
