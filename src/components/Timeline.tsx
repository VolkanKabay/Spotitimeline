import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Tooltip,
  ButtonGroup,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  getTopArtistsWithTimeRange,
  getTopTracksWithTimeRange,
  getTopTrackForArtist,
} from "../api/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AlbumIcon from "@mui/icons-material/Album";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Artist, Track } from "../types/spotify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954",
    },
    secondary: {
      main: "#1DB954",
    },
    background: {
      default: "#121212",
      paper: "#181818",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

const Timeline = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("short_term");
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [currentArtistTopTrack, setCurrentArtistTopTrack] = useState(null);
  const token = window.localStorage.getItem("spotify_token");

  useEffect(() => {
    if (!token) return;
    Promise.all([
      getTopTracksWithTimeRange(timeRange),
      getTopArtistsWithTimeRange(timeRange),
    ])
      .then(([tracksData, artistsData]) => {
        setTopTracks(tracksData.items);
        setTopArtists(artistsData.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [token, timeRange]);

  useEffect(() => {
    if (topArtists[currentArtistIndex]?.id) {
      getTopTrackForArtist(topArtists[currentArtistIndex].id)
        .then((data) => {
          setCurrentArtistTopTrack(data);
        })
        .catch((error) => {
          console.error("Error fetching artist top tracks:", error);
          setCurrentArtistTopTrack(null);
        });
    }
  }, [currentArtistIndex, topArtists]);

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
          Loading your music profile...
        </Typography>
      </Box>
    );
  }

  const artistChartData = {
    labels: topArtists.map((artist) => artist.name),
    datasets: [
      {
        label: "Popularity",
        data: topArtists.map((artist) => artist.popularity),
        backgroundColor: "rgba(29, 185, 84, 0.8)",
        borderColor: "#1DB954",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(29, 185, 84, 1)",
      },
    ],
  };

  const handleCardClick = (url: string | URL | undefined) => {
    window.open(url, "_blank");
  };

  const handleNextArtist = () => {
    if (currentArtistIndex < topArtists.length - 1) {
      setCurrentArtistIndex(currentArtistIndex + 1);
    }
  };

  const handlePrevArtist = () => {
    if (currentArtistIndex > 0) {
      setCurrentArtistIndex(currentArtistIndex - 1);
    }
  };

  const formatTimeRange = (range: string) => {
    switch (range) {
      case "short_term":
        return "Last Month";
      case "medium_term":
        return "Last 6 Months";
      case "long_term":
        return "All Time";
      default:
        return "Custom";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
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
            Your Spotify Analytics
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400 }}
          >
            Explore your unique listening journey
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Chip
              icon={<AccessTimeIcon />}
              label={formatTimeRange(timeRange)}
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<HistoryIcon />}
              label={`${topTracks.length} Top Tracks`}
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<PersonIcon />}
              label={`${topArtists.length} Top Artists`}
              color="primary"
              variant="outlined"
            />
          </Box>
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

        {/* Main content */}
        <Grid container spacing={4}>
          {/* Artist Chart */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                height: "100%",
                backgroundImage: "linear-gradient(to bottom, #282828, #181818)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <EqualizerIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Artist Popularity
                </Typography>
              </Box>
              <Box sx={{ height: 320 }}>
                <Bar
                  data={artistChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        titleFont: {
                          size: 16,
                          weight: "bold",
                        },
                        bodyFont: {
                          size: 14,
                        },
                        padding: 12,
                        displayColors: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                        ticks: {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                        ticks: {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Artist Profile */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                height: "100%",
                backgroundImage: "linear-gradient(to bottom, #282828, #181818)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FavoriteIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Artist Profile
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Avatar
                  src={
                    topArtists[currentArtistIndex]?.images[0]?.url ||
                    "/default-profile.jpg"
                  }
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    border: "4px solid #1DB954",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                  }}
                />
                <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "primary.main",
                    }}
                  >
                    {topArtists[currentArtistIndex]?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{ color: "text.secondary", mb: 3 }}
                  >
                    Rank: #{currentArtistIndex + 1} • Popularity:{" "}
                    {topArtists[currentArtistIndex]?.popularity}%
                  </Typography>
                </Box>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    width: "100%",
                    mb: 3,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MusicNoteIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Top Track
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1, pl: 3 }}>
                    {currentArtistTopTrack}
                  </Typography>
                </Paper>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handlePrevArtist}
                    disabled={currentArtistIndex === 0}
                    startIcon={<ArrowBackIcon />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() =>
                      handleCardClick(
                        topArtists[currentArtistIndex]?.external_urls?.spotify
                      )
                    }
                    endIcon={<PlayArrowIcon />}
                  >
                    Open Artist
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleNextArtist}
                    disabled={currentArtistIndex === topArtists.length - 1}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Top Tracks */}
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 3, fontWeight: "bold" }}
            >
              Your Top Tracks
            </Typography>
            <Grid container spacing={3}>
              {topTracks.slice(0, 6).map((track, index) => (
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={Link}
                href="/tracks"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                View All Top Tracks
              </Button>
            </Box>
          </Grid>
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

export default Timeline;
