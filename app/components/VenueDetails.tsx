"use client";
import React, { FC } from "react";
import { VenueData } from "../hooks/useBooking";

interface VenueDetailsProps {
  venueData: VenueData;
}

const VenueDetails: FC<VenueDetailsProps> = ({ venueData }) => {
  return (
    <div className="shadow-xl flex flex-wrap md:flex-row mt-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 border-t md:border-t-0 md:border-r border-gray-200 shadow-inner order-2 md:order-1 p-4">
        <h2 className="text-2xl font-semibold mb-2 mt-4 text-center">
          Details
        </h2>
        <p>{venueData.description}</p>
        <p>Price: {venueData.price}</p>
        <p>Max Guests: {venueData.maxGuests}</p>
        <p>Rating: {venueData.rating}</p>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 border-t md:border-t-0 md:border-r border-gray-200 shadow-inner order-1 md:order-2 p-4">
        <h2 className="text-2xl font-semibold mb-2 mt-4 text-center">
          Location
        </h2>
        <p>Address: {venueData.location.address}</p>
        <p>City: {venueData.location.city}</p>
        <p>Country: {venueData.location.country}</p>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 border-t md:border-t-0 order-3 md:order-3 p-4">
        <h2 className="text-2xl font-semibold mb-2 mt-4 text-center">
          Amenities
        </h2>
        <ul>
          <li>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</li>
          <li>Parking: {venueData.meta.parking ? "Yes" : "No"}</li>
          <li>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</li>
          <li>Pets: {venueData.meta.pets ? "Yes" : "No"}</li>
        </ul>
      </div>
    </div>
  );
};

export default VenueDetails;
