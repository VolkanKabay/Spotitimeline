import { Divider, Typography } from "@mui/material";
import { theme } from "../theme/theme";

const Footer = () => {
  return (
    <>
      <Divider sx={{ mb: 4 }} />
      <Typography variant="body2" color="text.secondary">
        Data provided by Spotify API. This dashboard visualizes your personal
        listening habits and preferences.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} &nbsp;
        <a
          href="https://github.com/VolkanKabay/"
          target="_blank"
          rel="noreferrer"
          style={{ color: theme.palette.primary.main }}
        >
          TimelineSpotify
        </a>
      </Typography>
    </>
  );
};

export default Footer;
