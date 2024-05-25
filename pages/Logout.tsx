import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React from "react";
import "../app/globals.css";
import { Button, buttonVariants } from "../components/ui/button";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("SalmonKey");
    Cookies.remove("accessToken");
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Logout Page</h2>
        <Button
          onClick={handleLogout}
          className="bg-blue-500 text-white rounded px-3 py-2"
        >
          Logout
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default Logout;
