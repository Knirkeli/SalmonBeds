import React, { FC } from "react";
import { VenueData } from "path-to-your-venue-data-type";

interface VenueDetailsProps {
  venueData: VenueData;
}

const VenueDetails: FC<VenueDetailsProps> = ({ venueData }) => {
  return (
    <div className="shadow-xl text-center flex flex-wrap lg:flex-col">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
        <h2 className="text-2xl font-semibold mb-2 mt-4">Location</h2>
        <p>Address: {venueData.location.address}</p>
        <p>City: {venueData.location.city}</p>
        <p>Country: {venueData.location.country}</p>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
        <h2 className="text-2xl font-semibold mb-2 mt-4">Amenities</h2>
        <p>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</p>
        <p>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
        <p>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
        <p>Pets: {venueData.meta.pets ? "Yes" : "No"}</p>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
        <h2 className="text-2xl font-semibold mb-2 mt-4">Details</h2>
        <p>{venueData.description}</p>
        <p>Price: {venueData.price}</p>
        <p>Max Guests: {venueData.maxGuests}</p>
        <p>Rating: {venueData.rating}</p>
      </div>
    </div>
  );
};

export default VenueDetails;
