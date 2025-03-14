import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash: string = window.location.hash;
    let token: string | undefined | null =
      window.localStorage.getItem("spotify_token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        window.localStorage.setItem("spotify_token", token);
      }
    }

    if (token) {
      navigate("/timeline");
    } else {
      console.error("Kein Spotify-Token gefunden!");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Authentifizierung erfolgreich. Weiterleitung...</h2>
    </div>
  );
};

export default Callback;
