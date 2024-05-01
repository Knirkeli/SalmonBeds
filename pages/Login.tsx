// import React, { useState, useEffect } from "react";
// import { API_LOGIN } from "../shared/apis";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import { setAccessToken, setUser } from "../shared/cookies";

// async function loginUser(email: string, password: string) {
//   const response = await fetch(API_LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   const data = await response.json();
//   return data;
// }

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const validateEmail = () => {
//       const re =
//         /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(noroff|stud\.noroff)\.no$/;
//       return re.test(email);
//     };

//     setEmailError(!validateEmail());
//   }, [email]);

//   useEffect(() => {
//     setPasswordError(password.length < 8);
//   }, [password]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!emailError && !passwordError) {
//       try {
//         const response = await loginUser(email, password);
//         const data = response.data;
//         console.log(data);
//         // Use the returned data to log the user in

//         // Set the access token and user cookies
//         setAccessToken(data.accessToken);
//         setUser(data);

//         // Navigate to the Profile page
//         router.push("/Profile");
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       {emailError && <p>Please enter a valid Noroff email.</p>}
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {passwordError && <p>Password must be at least 8 characters long.</p>}
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState, useEffect } from "react";
import { API_LOGIN, API_KEY } from "../shared/apis";
import { useRouter } from "next/router";
import { setAccessToken, setApiKeyCookie, setUser } from "../shared/cookies";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "../app/globals.css";
import { Button, buttonVariants } from "../components/ui/button";

async function loginUser(email: string, password: string) {
  const response = await fetch(API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}

async function createApiKey(accessToken: string, name?: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  };

  const response = await fetch(API_KEY, options);
  const data = await response.json();

  if (response.ok) {
    return data.data.key;
  } else {
    throw new Error(data.error);
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateEmail = () => {
      const re =
        /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(noroff|stud\.noroff)\.no$/;
      return re.test(email);
    };

    setEmailError(!validateEmail());
  }, [email]);

  useEffect(() => {
    setPasswordError(password.length < 8);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const response = await loginUser(email, password);
        const data = response.data;

        // Use the returned data to log the user in

        // Set the access token and user cookies
        setAccessToken(data.accessToken);
        setUser(data);

        const apiKey = await createApiKey(data.accessToken);
        console.log(`API Key: ${apiKey}`);

        // Set the API key cookie
        setApiKeyCookie(apiKey);

        // Navigate to the Profile page
        router.push("/Manager");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>Please enter a valid Noroff email.</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>Password must be at least 8 characters long.</p>}
        <Button type="submit">Login</Button>
      </form>{" "}
      <Footer />
    </>
  );
};

export default LoginForm;
