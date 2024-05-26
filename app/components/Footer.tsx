"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full border-t bg-white mt-6">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="flex items-center">
          <Image src="/sblogo.png" alt="Logo" width={50} height={50} />
          <h1 className="text-lg">SalmonBeds</h1>
        </div>
        <p className="text-sm">&copy; Knirkefri Design</p>
      </div>
    </footer>
  );
}
