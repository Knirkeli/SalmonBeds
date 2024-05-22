import { useState } from 'react';
import { getAccessToken, getApiKey } from "../../shared/cookies";
import { API_BOOKINGS } from "../../shared/apis";

export function useBooking(venueData, id) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);

  const handleBooking = async () => {
    if (!dateRange) {
      alert("Please select a date range first.");
      return;
    }

    const token = getAccessToken();
    const apiKey = getApiKey();

    const response = await fetch(API_BOOKINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({
        dateFrom: dateRange.from.toISOString(),
        dateTo: dateRange.to.toISOString(),
        guests: venueData.maxGuests,
        venueId: id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    window.alert("Booking successful!");
  };

  return { dateRange, setDateRange, handleBooking };
}