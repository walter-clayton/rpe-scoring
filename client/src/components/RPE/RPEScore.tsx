import React, { useEffect, useState } from "react";
import RPEChart from "../../assets/RPE-Chart.png";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Theme } from "@mui/material/styles";

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
  const [showImage, setShowImage] = useState(false);
  const [open, setOpen] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for progress indicator
  const [snackbarMessage, setSnackbarMessage] = useState<React.ReactNode>(""); // Snackbar message state

  const handleOpen = (message: React.ReactNode) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = async (num: number, emoji: string, colors: string) => {
    setButtonsDisabled(true);
    setLoading(true); // Show progress indicator

    try {
      console.log("Sending POST request to backend...");

      const response = await axios.post(
        "http://localhost:4000/rpe" /*process.env.REACT_APP_RPEPOST_URL!*/,
        {
          emoji: emoji,
          numeroClique: num,
          colors: colors,
        }
      );

      console.log("Response from backend:", response);

      if (response.status === 201) {
        console.log(`RPE data for ${emoji} clicked`);
        handleOpen(
          <div>
            <div>✅ You have registered your score!</div>
            <div style={{ marginTop: "8px" }}>
              {emoji} Your score is {num}.
            </div>
          </div>
        );
      } else {
        console.error("Error from server:", response.data);
        handleOpen(
          <div>
            <div>❌ There was a problem registering your score.</div>
            <div style={{ marginTop: "8px" }}>Please try again.</div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error saving RPE data:", error);
    } finally {
      setButtonsDisabled(false);
      setLoading(false); // Hide progress indicator
    }
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [dialogOpen, setDialogOpen] = useState(true);

  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    if (password === "123") {
      setDialogOpen(false);
    } else {
      setPassword("");
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        width: "100%",
        padding: 2,
      }}
    >
      <Dialog open={dialogOpen} onClose={handlePasswordSubmit}>
        <DialogTitle>Enter Password</DialogTitle>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePasswordSubmit();
          }}
        >
          <DialogContent>
            <DialogContentText>
              To access this page, please enter your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePasswordSubmit}>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      {!dialogOpen && (
        <>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center" gutterBottom>
              RPE SCORE
            </Typography>
          </Grid>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={100} />
            </Box>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              wrap={isSmallScreen ? "wrap" : "nowrap"}
            >
              {emojis.map((emoji, index) => (
                <Grid
                  key={index}
                  item
                  xs={isSmallScreen ? 12 : "auto"}
                  style={{ textAlign: "center" }}
                >
                  <Typography
                    variant="h3"
                    style={{ fontSize: isSmallScreen ? "2em" : "3em" }}
                  >
                    {emoji}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{
                      fontSize: isSmallScreen ? "1em" : "2em",
                      color: "black",
                      margin: "10px",
                      padding: "0px 20px 0px 20px",
                      backgroundColor: colors[index],
                      borderRadius: "15px",
                    }}
                    onClick={() => handleClick(index + 1, emoji, colors[index])}
                    disabled={buttonsDisabled}
                  >
                    {index + 1}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}

          <Button
            startIcon={<ListAltIcon />}
            style={{
              position: "fixed",
              right: "20px",
              bottom: "20px",
              color: "#fff",
              padding: "10px 50px 10px 50px",
              borderRadius: "40px",
              backgroundColor: "RGB(108, 77, 123)",
              zIndex: 1000,
            }}
            onClick={() => setShowImage(true)}
          >
            RPE Chart
          </Button>

          {showImage && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "black",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={RPEChart}
                  alt="RPE Chart"
                  style={{
                    maxWidth: isSmallScreen ? "80vw" : "90vw",
                    maxHeight: isSmallScreen ? "80vh" : "90vh",
                  }}
                />
                <Button
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",

                    color: "white",
                    borderRadius: "50%",
                  }}
                  onClick={() => setShowImage(false)}
                >
                  X
                </Button>
              </div>
            </div>
          )}

          {open && (
            <>
              <Backdrop
                open={open}
                sx={{
                  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
              />
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1400,
                }}
              >
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  message={snackbarMessage}
                  ContentProps={{
                    sx: {
                      textAlign: "left",
                    },
                  }}
                  action={
                    <React.Fragment>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                />
              </div>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default RPEScore;
