import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  ThemeProvider,
  CssBaseline,
  ButtonGroup,
} from "@mui/material";
import { theme } from "../theme/theme";

const SpotifyAuth: React.FC = () => {
  // Replace the client id with your own Spotify API credentials, create a .env file in the root of the project and add the following line:
  // VITE_SPOTIFY_CLIENT_ID=your_client_id_here
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  console.log(clientId);
  const redirectUri = "http://localhost:5173/callback";
  const scope = "user-top-read";
  const responseType = "token";

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            borderRadius: 4,
            boxShadow: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: theme.palette.primary.main,
            }}
          >
            TimelineSpotify
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 4,
              color: theme.palette.text.secondary,
            }}
          >
            Visualize your Spotify listening history, top tracks, and more!
          </Typography>
          <Typography
            sx={{
              marginBottom: 4,
              color: theme.palette.text.secondary,
            }}
          >
            What would you like to see?
          </Typography>
          <ButtonGroup>
            <Button href={authUrl} variant="outlined" color="primary">
              Top Tracks
            </Button>
            <Button href={authUrl} variant="outlined" color="primary">
              Top Artists
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 2,
          left: 2,
          right: 2,
          textAlign: "center",
          color: theme.palette.text.secondary,
        }}
      >
        <Typography variant="body2">
          Made with ❤️ by {""}
          <a
            href="https://github.com/VolkanKabay/"
            target="_blank"
            rel="noreferrer"
            style={{ color: theme.palette.primary.main }}
          >
            Volkan Kabay
          </a>
        </Typography>
        <br />
      </Box>
    </ThemeProvider>
  );
};

export default SpotifyAuth;
