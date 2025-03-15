import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Tooltip,
  Divider,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
  Button,
  ButtonGroup,
} from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import { Track } from "../types/spotify";
import { getTopTracksWithTimeRange } from "../api/api";
import { theme } from "../theme/theme";

const Tracks = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("short_term");
  const token = window.localStorage.getItem("spotify_token");

  useEffect(() => {
    if (!token) return;
    getTopTracksWithTimeRange(timeRange)
      .then((data) => {
        setTopTracks(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
        setLoading(false);
      });
  }, [token, timeRange]);

  const handleCardClick = (url: string | URL | undefined) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#121212",
          color: "white",
        }}
      >
        <CircularProgress
          sx={{
            color: "#1DB954",
            mb: 3,
          }}
          size={60}
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }} color="primary">
          Loading your top tracks...
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              window.location.href = "/timeline";
            }}
            sx={{ mb: 4 }}
          >
            Back to All Analytics
          </Button>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 1,
              fontWeight: 800,
              background: "linear-gradient(45deg, #1DB954 30%, #1ED760 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Your Top Tracks
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400 }}
          >
            Explore your most played tracks
          </Typography>
          <ButtonGroup variant="outlined" size="large" sx={{ mb: 2 }}>
            <Button
              onClick={() => setTimeRange("short_term")}
              color={timeRange === "short_term" ? "primary" : "inherit"}
              variant={timeRange === "short_term" ? "contained" : "outlined"}
            >
              Last Month
            </Button>
            <Button
              onClick={() => setTimeRange("medium_term")}
              color={timeRange === "medium_term" ? "primary" : "inherit"}
              variant={timeRange === "medium_term" ? "contained" : "outlined"}
            >
              Last 6 Months
            </Button>
            <Button
              onClick={() => setTimeRange("long_term")}
              color={timeRange === "long_term" ? "primary" : "inherit"}
              variant={timeRange === "long_term" ? "contained" : "outlined"}
            >
              All Time
            </Button>
          </ButtonGroup>
        </Box>

        {/* Tracks List */}
        <Grid container spacing={3}>
          {topTracks.map((track, index) => (
            <Grid item xs={12} sm={6} md={4} key={track.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(track.external_urls.spotify)}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={track.album.images[0]?.url || "/default-album.jpg"}
                  alt={track.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {track.name}
                    </Typography>
                    <Chip
                      label={`#${index + 1}`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title="Album">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AlbumIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "150px",
                          }}
                        >
                          {track.album.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Popularity">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EqualizerIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "#1DB954" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {track.popularity}%
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 8, mb: 2, textAlign: "center" }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body2" color="text.secondary">
            Data provided by Spotify API. This dashboard visualizes your
            personal listening habits and preferences.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} TimelineSpotify
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Tracks;
