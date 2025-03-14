import { useEffect, useState } from "react";
import { Artist, Track } from "../types/spotify";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Link,
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
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const Timeline = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("short_term");
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [currentArtistTopTrack, setCurrentArtistTopTrack] =
    useState<null>(null);
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
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  }

  const artistChartData = {
    labels: topArtists.map((artist) => artist.name),
    datasets: [
      {
        label: "Beliebtheit",
        data: topArtists.map((artist) => artist.popularity),
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
        borderWidth: 2,
        hoverBackgroundColor: "#1db94f90",
        hoverBorderColor: "#1db94f90",
      },
    ],
  };

  const handleCardClick = (url: string) => {
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

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        🎧 Deine Musik-Statistik
      </Typography>

      <ButtonGroup
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Button
          onClick={() => setTimeRange("short_term")}
          color={timeRange === "short_term" ? "success" : "primary"}
        >
          Letzter Monat
        </Button>
        <Button
          onClick={() => setTimeRange("medium_term")}
          color={timeRange === "medium_term" ? "success" : "primary"}
        >
          Letzte 6 Monate
        </Button>
        <Button
          onClick={() => setTimeRange("long_term")}
          color={timeRange === "long_term" ? "success" : "primary"}
        >
          Aller Zeiten
        </Button>
      </ButtonGroup>

      <Grid container spacing={4} alignItems="stretch">
        {/* Künstler-Chart */}
        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
          <Paper
            elevation={6}
            sx={{ padding: 3, borderRadius: 2, flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Top Künstler (Beliebtheit)
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
                  y: { beginAtZero: true },
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Profilinfo */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 3,
              borderRadius: 2,
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              🎶 Dein Musikprofil
            </Typography>
            <Avatar
              src={
                topArtists[currentArtistIndex]?.images[0]?.url ||
                "/default-profile.jpg"
              }
              sx={{ width: 120, height: 120, margin: "0 auto 10px" }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1DB954" }}
            >
              Lieblingskünstler:<br></br>{" "}
              <Link
                href={topArtists[currentArtistIndex]?.external_urls.spotify}
                target="_blank"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {currentArtistIndex + 1}: {topArtists[currentArtistIndex]?.name}
              </Link>
            </Typography>
            {/* Display the top track for the current artist */}
            <Typography variant="body1" mt={2}>
              Top-Track für diesen Künstler: <br></br>
              {currentArtistTopTrack}
            </Typography>

            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <IconButton
                onClick={handlePrevArtist}
                disabled={currentArtistIndex === 0}
                color="primary"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={handleNextArtist}
                disabled={currentArtistIndex === topArtists.length - 1}
                color="primary"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Song-Cards */}
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          🎵 Deine Top Songs
        </Typography>
        <Grid container spacing={2}>
          {topTracks.map((track, index) => (
            <Grid item xs={12} sm={6} md={4} key={track.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  height: 300,
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(track.external_urls.spotify)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={track.album.images[0]?.url || "/default-album.jpg"}
                  alt={track.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {index + 1}. {track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Künstler: {track.artists.map((a) => a.name).join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Album: {track.album.name}
                  </Typography>
                </CardContent>
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  color="primary"
                  size="small"
                >
                  <Tooltip title="Mehr Infos">
                    <InfoIcon />
                  </Tooltip>
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Timeline;
