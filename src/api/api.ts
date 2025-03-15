import axios from "axios";

const getToken = () => window.localStorage.getItem("spotify_token");

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/me",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token expired. Redirecting to login...");
      window.localStorage.removeItem("spotify_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const getTopArtists = async () => (await api.get("/top/artists")).data;
export const getTopTracks = async () => (await api.get("/top/tracks")).data;
export const getTopTracksWithTimeRange = async (timeRange: string) =>
  (await api.get(`/top/tracks?time_range=${timeRange}&limit=30`)).data;
export const getTopArtistsWithTimeRange = async (timeRange: string) =>
  (await api.get(`/top/artists?time_range=${timeRange}&limit=30`)).data;
export const getRecentlyPlayed = async () =>
  (await axios.get("/api/recently-played")).data;
export const getRecommendations = async () =>
  (await axios.get("/api/recommendations")).data;

export const getTopTrackForArtist = async (artistId: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
