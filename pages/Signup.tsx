import React, { useState, useEffect } from "react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      const payload = {
        name,
        email,
        password,
        bio,
        avatar: {
          url: avatarUrl,
          alt: `${name} avatar`,
        },
        banner: {
          url: bannerUrl,
          alt: `${name} banner`,
        },
        venueManager,
      };
      // Submit form with payload
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {emailError && <p>Please enter a valid Noroff email.</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {passwordError && <p>Password must be at least 8 characters long.</p>}
      {/* <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        required
      />
      {/* <input
        type="text"
        placeholder="Banner URL"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
      /> */}
      <label>
        <input
          type="checkbox"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
        />
        Venue Manager
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
