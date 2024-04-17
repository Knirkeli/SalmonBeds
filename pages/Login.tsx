// import React, { useState, useEffect } from "react";
// import { setAccessToken, setUser } from "../shared/cookies";
// import { API_LOGIN } from "../shared/apis";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!emailError && !passwordError) {
//       try {
//         const data = await API_LOGIN(email, password);
//         console.log(data);
//         // Use the returned data to log the user in
//       } catch (error) {
//         // Handle error
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
import { API_LOGIN } from "../shared/apis";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setAccessToken, setUser } from "../shared/cookies";

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
        console.log(data);
        // Use the returned data to log the user in

        // Set the access token and user cookies
        setAccessToken(data.accessToken);
        setUser(data);

        // Navigate to the Profile page
        router.push("/Profile");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
