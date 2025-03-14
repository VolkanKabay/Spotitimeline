import React from "react";

const SpotifyAuth: React.FC = () => {
  const clientId = "3bf2d655774c4133831508748165f80c";
  const redirectUri = "http://localhost:5173/callback"; // Verwende eine spezifische Callback-Route
  const scope = "user-top-read user-library-read";
  const responseType = "token";

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

  return (
    <div>
      <h1>Willkommen zur Musik-Timeline App!</h1>
      <a href={authUrl}>Mit Spotify anmelden</a>
    </div>
  );
};

export default SpotifyAuth;
