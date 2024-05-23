import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logoIcon from "../../assets/Afitpilot_logo_outlined.png";

const RPEOptions = [
  { title: "RPE Score", path: "/RPEScore" },
  { title: "RPE Dashboard", path: "/RPEDashboard" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        background: "black",
        margin: 0,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <IconButton
            sx={{ p: 0, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            <Avatar
              alt="logo"
              src={logoIcon}
              sx={{
                width: 48,
                height: 48,
                borderRadius: "0",
              }}
            />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mx: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              alignSelf: "center",
              letterSpacing: ".25rem",
              fontSize: "120%",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            AFITPILOT
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {RPEOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    navigate(option.path);
                    window.scrollTo(0, 0);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{option.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {RPEOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  navigate(option.path);
                  window.scrollTo(0, 0);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {option.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
