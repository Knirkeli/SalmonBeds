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
      <div>
        <h1>Create a Venue</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </label>
          <label>
            Max Guests:
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              required
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </label>
          <label>
            Wifi:
            <input
              type="checkbox"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
            />
          </label>
          <label>
            Parking:
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
            />
          </label>
          <label>
            Breakfast:
            <input
              type="checkbox"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
            />
          </label>
          <label>
            Pets:
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Zip:
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label>
            Continent:
            <input
              type="text"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
            />
          </label>
          <label>
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(Number(e.target.value))}
            />
          </label>
          <Button type="submit">Create Venue</Button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Create;
