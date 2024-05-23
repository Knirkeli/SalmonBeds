import { useEffect, useState } from "react";
import { apiRequest, API_PROFILES, API_VENUES } from "../../shared/apis";
import Cookies from "js-cookie";
import Router from "next/router";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import "../../app/globals.css";
import { Button, buttonVariants } from "../../components/ui/button";
import { useVenueData } from "../../app/useFetch/useFetchId.ts";
