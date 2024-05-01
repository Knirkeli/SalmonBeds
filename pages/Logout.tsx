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
      <div>
        Logout Page
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Footer />
    </>
  );
};

export default Logout;
