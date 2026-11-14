import { useState } from "react";
import RPEChart from "../../assets/RPE-Chart.png";
import { saveScore } from "../../lib/rpeStore";
import { Box, Button, Dialog, IconButton, Snackbar, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";

const emojis = ["😆", "😋", "😊", "🙂", "😉", "😯", "😪", "😥", "😭", "😵"];
const colors = [
  "#5ce1e6",
  "#37b6fe",
  "#37b6fe",
  "#7dd957",
  "#7dd957",
  "#7dd957",
  "#ffde59",
  "#ffde59",
  "#fe904c",
  "#fe1616",
];

const RPEScore = () => {
  const [showChart, setShowChart] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = (num: number) => {
    try {
      saveScore(num);
      setMessage(`Score saved: ${num} out of 10.`);
    } catch (error) {
      console.error("Error saving RPE data:", error);
      setMessage("Your browser is not allowing this page to save scores.");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        boxSizing: "border-box",
        pt: { xs: 11, md: 13 },
        pb: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Typography
        component="h1"
        align="center"
        sx={{ fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, fontWeight: 300, lineHeight: 1.1 }}
      >
        RPE SCORE
      </Typography>
      <Typography
        align="center"
        sx={{ mt: 1.5, mb: { xs: 3, md: 5 }, color: "rgba(255,255,255,0.7)", maxWidth: 520 }}
      >
        How hard was your session? Tap a number from 1 (very easy) to 10
        (maximal effort).
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(5, 1fr)",
            lg: "repeat(10, 1fr)",
          },
          gap: { xs: 1.5, md: 2 },
          width: "100%",
          maxWidth: { xs: 420, sm: 720, lg: 1200 },
        }}
      >
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index + 1)}
            data-testid={`score-button-${index + 1}`}
            aria-label={`Score ${index + 1}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              py: { xs: 1.5, md: 2 },
              borderRadius: "16px",
              backgroundColor: colors[index],
              color: "#000",
              textTransform: "none",
              "&:hover": { backgroundColor: colors[index], filter: "brightness(1.1)" },
            }}
          >
            <Box component="span" aria-hidden sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1 }}>
              {emoji}
            </Box>
            <Box component="span" sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 700, lineHeight: 1 }}>
              {index + 1}
            </Box>
          </Button>
        ))}
      </Box>

      <Button
        startIcon={<ListAltIcon />}
        onClick={() => setShowChart(true)}
        sx={{
          mt: { xs: 4, md: 6 },
          px: 4,
          py: 1.25,
          borderRadius: "40px",
          color: "#fff",
          backgroundColor: "rgb(108, 77, 123)",
          "&:hover": { backgroundColor: "rgb(128, 92, 146)" },
        }}
      >
        RPE Chart
      </Button>

      <Dialog open={showChart} onClose={() => setShowChart(false)} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", p: { xs: 1, sm: 2 }, backgroundColor: "#000" }}>
          <IconButton
            aria-label="Close chart"
            onClick={() => setShowChart(false)}
            sx={{ position: "absolute", top: 8, right: 8, color: "#fff", backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={RPEChart}
            alt="RPE Chart"
            sx={{ display: "block", width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain" }}
          />
        </Box>
      </Dialog>

      <Snackbar
        open={message !== null}
        autoHideDuration={3000}
        onClose={(_e, reason) => reason !== "clickaway" && setMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={message}
      />
    </Box>
  );
};

export default RPEScore;
