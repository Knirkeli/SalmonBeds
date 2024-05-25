"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { apiRequest, API_VENUES } from "../shared/apis";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { Button, buttonVariants } from "../components/ui/button";
import "../app/globals.css";

function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venue = {
      name,
      description,
      media: [{ url: imageUrl, alt: name }],
      price,
      maxGuests,
      rating,
      meta: { wifi, parking, breakfast, pets },
      location: { address, city, zip, country, continent, lat, lng },
    };

    await apiRequest(API_VENUES, "POST", venue);
    router.push("/Manager");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-5 mb-20">
        <h1 className="text-2xl mb-5">Create a Venue</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
          <label className="mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Image URL:
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Max Guests:
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              required
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Rating:
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Wifi:
            <input
              type="checkbox"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
              className="mt-1 mb-4"
            />
          </label>
          <label className="mb-2">
            Parking:
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="mt-1 mb-4"
            />
          </label>
          <label className="mb-2">
            Breakfast:
            <input
              type="checkbox"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
              className="mt-1 mb-4"
            />
          </label>
          <label className="mb-2">
            Pets:
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
              className="mt-1 mb-4"
            />
          </label>
          <label className="mb-2">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Zip:
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Continent:
            <input
              type="text"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <label className="mb-2">
            Longitude:
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(Number(e.target.value))}
              className="border p-2 mt-1 mb-4 w-full"
            />
          </label>
          <Button type="submit" className="self-center mt-4">
            Create Venue
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Create;
