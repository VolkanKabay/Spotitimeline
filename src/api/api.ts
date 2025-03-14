import axios from "axios";
const token = window.localStorage.getItem("spotify_token");
export const getTopArtists = async () => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const getTopTracks = async () => {
  const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRecentlyPlayed = async () => {
  const response = await axios.get("/api/recently-played");
  return response.data;
};

export const getRecommendations = async () => {
  const response = await axios.get("/api/recommendations");
  return response.data;
};
