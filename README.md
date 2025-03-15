# TimelineSpotify- A Web Application for interesting information about your personal Spotify data.

## Description
Demo at: https://timeline-spotify.vercel.app/timeline (Wont work because of spotify api restrictions)
The TimelineSpotify App allows users to create their own music timeline by logging in with their Spotify account. Track your favorite artists, songs, and more! This app leverages the Spotify API to fetch data about users' top tracks and libraries.
![image](https://github.com/user-attachments/assets/90606a93-9920-480e-93d6-42dc2931113c)

## Features

- **Spotify Authentication**: Secure login via Spotify.
- **Track Your Music**: View your top artists and tracks.
- **Personalized Timeline**: Display your favorite songs and artists in a dynamic timeline.

## Requirements

- Node.js (version 16 or higher)
- React (version 18 or higher)
- Material UI (MUI v5 or later)
- Spotify Developer Account (it's free, don't worry)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/VolkanKabay/TimelineSpotify.git
   cd TimelineSpotify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your Spotify API credentials:

   - Create a [Spotify Developer Account](https://developer.spotify.com/).
   - Create an app to get your `clientId` and `redirectUri`.
   - Replace the values in `SpotifyAuth.tsx` (clientId and redirectUri).

4. Run the app locally:

   ```bash
   npm run dev
   ```

5. The app will be available at `http://localhost:5173`.

## How it Works

- The app uses Spotify's authorization endpoint to authenticate the user and obtain access tokens.
- Once authenticated, users can view their top tracks and artists, based on the permissions granted.

## Code Example

```tsx
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const SpotifyAuth: React.FC = () => {
  const clientId = "YOUR_SPOTIFY_CLIENT_ID";
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
         TimelineSpotify
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
            "&:hover": { backgroundColor: "#1aa34a" },
          }}
        >
          Mit Spotify anmelden
        </Button>
      </Box>
    </Container>
  );
};

export default SpotifyAuth;
```
