import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import "../../app/globals.css";
import { useManagerData } from "../../app/hooks/useManagerData";
import { MyBookings } from "../../app/components/MyBookings";
import { MyVenues } from "../../app/components/MyVenues";
import { ProfileInfo } from "../../app/components/UserData";
import { API_VENUES, apiRequest } from "@/shared/apis";

function Manager() {
  const { profile, bookings, venues, setVenues } = useManagerData();
  const user = JSON.parse(Cookies.get("user") || "{}");

  const handleDelete = async (id) => {
    await apiRequest(`${API_VENUES}/${id}`, "DELETE");
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  const handleEdit = (id) => {
    Router.push(`/Edit/${id}`);
  };

  if (!profile || !venues) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <ProfileInfo profile={profile} />
        <div className="flex flex-wrap justify-between">
          <div
            className={`w-full mt-6 ${
              user.venueManager ? "md:w-1/2" : "md:w-full"
            } mx-auto`}
          >
            <MyBookings bookings={bookings} />
          </div>
          {user.venueManager && (
            <div className="w-full md:w-1/2">
              <MyVenues
                venues={venues}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Manager;
