import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
    background: { default: "#ffffff", paper: "#f4f4f4" },
    text: { primary: "#333333", secondary: "#555555" },
  },
});

export default lightTheme;
