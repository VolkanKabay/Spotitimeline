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

export const getTopTracksWithTimeRange = async (timeRange: string) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopArtistsWithTimeRange = async (timeRange: string) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=30`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
export const getTopTrackForArtist = async (artistId: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const topTrack = response.data.tracks.reduce(
      (maxTrack: { popularity: number }, track: { popularity: number }) =>
        track.popularity > maxTrack.popularity ? track : maxTrack
    );

    return topTrack.name;
  } catch (error) {
    console.error("Error fetching top track:", error);
    return null;
  }
};
