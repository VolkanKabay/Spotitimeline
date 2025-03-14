import React, { useEffect, useState } from "react";
import { Artist, Track } from "./types/spotify";
import { Container, Grid, Typography, Paper, Box, Link } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTopArtists, getTopTracks } from "./api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Timeline: React.FC = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const token = window.localStorage.getItem("spotify_token");

  useEffect(() => {
    if (!token) return;

    getTopTracks().then((data) => {
      setTopTracks(data.items);
    });
    getTopArtists().then((data) => {
      setTopArtists(data.items);
    });
  }, [token]);

  const artistNames = topArtists.map((artist) => artist.name);
  const artistPlayCounts = topArtists.map((artist) => artist.popularity);

  const trackNames = topTracks.map((track) => track.name);
  const trackPlayCounts = topTracks.map((track) => track.popularity);

  const artistChartData = {
    labels: artistNames,
    datasets: [
      {
        label: "Anzahl der Wiedergaben",
        data: artistPlayCounts,
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
        borderWidth: 2,
        hoverBackgroundColor: "#1db94f90",
        hoverBorderColor: "#1db94f90",
      },
    ],
  };

  const trackChartData = {
    labels: trackNames,
    datasets: [
      {
        label: "Anzahl der Wiedergaben",
        data: trackPlayCounts,
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
        borderWidth: 2,
        hoverBackgroundColor: "#1db94f90",
        hoverBorderColor: "#1db94f90",
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Deine Musik-Timeline
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Deine Top-Künstler
            </Typography>
            <Bar
              data={artistChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Top Künstler",
                    font: { size: 16 },
                  },
                  tooltip: { bodyFont: { size: 14 } },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 10 },
                    grid: { color: "#e0e0e0" },
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Deine Top-Songs
            </Typography>

            <Bar
              data={trackChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Top Songs",
                    font: { size: 16 },
                  },
                  tooltip: { bodyFont: { size: 14 } },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 10 },
                    grid: { color: "#e0e0e0" },
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Künstler:
              </Typography>
              <ul>
                {topArtists.map((artist) => (
                  <li
                    key={artist.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={artist.images[0]?.url || "/default-image.jpg"}
                      alt="artist"
                      width="50"
                      height="50"
                      style={{
                        marginRight: "10px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Link
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { textDecoration: "underline" },
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {artist.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Songs:
              </Typography>
              <ul>
                {topTracks.map((track) => (
                  <li
                    key={track.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={track.album.images[0].url}
                      alt="track"
                      width="50"
                      height="50"
                      style={{
                        marginRight: "10px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Link
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {track.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Timeline;
