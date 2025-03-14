import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const SpotifyAuth: React.FC = () => {
  //* Replace the client id with your own Spotify API credentials if you have cloned the repository and put the redirect uri as the one you have set in your Spotify API dashboard
  const clientId = "3bf2d655774c4133831508748165f80c";
  const redirectUri = "http://localhost:5173/callback";
  const scope = "user-top-read user-library-read";
  const responseType = "token";

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#1DB954" }}
        >
          Musik-Timeline App
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Erstelle deine eigene Musik-Timeline, indem du dich mit deinem
          Spotify-Konto anmeldest. Verfolge deine Lieblingskünstler und Songs!
        </Typography>
        <Button
          href={authUrl}
          variant="contained"
          sx={{
            backgroundColor: "#1DB954",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1aa34a",
            },
          }}
        >
          Mit Spotify anmelden
        </Button>
      </Box>
    </Container>
  );
};

export default SpotifyAuth;
