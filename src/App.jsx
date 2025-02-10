import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ThemeProviderApi, { ThemeContextApi, useTheme } from "./theme/ThemeProvider";
import { lightTheme, darkTheme } from './theme/theme';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ApiEnergy from "./pages/ApiEnergy";
import NotFound from "./pages/NotFound";
import AppBar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Button from "@mui/material/Button";

function AppContent() {
  const { user } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  useEffect(() => {
    document.body.style.background = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  return (
    <Router>
      <AppBar />
      <Button onClick={toggleTheme} variant="contained" color="primary">
        Cambiar a {theme === lightTheme ? "Modo Oscuro" : "Modo Claro"}
      </Button>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setErrorLoginMessage={setErrorLoginMessage}
              errorLoginMessage={errorLoginMessage}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        {/* Ruta protegida (solo accesible si el usuario está autenticado) */}
        <Route
          path="/api-energy"
          element={
            <ProtectedRoute>
              <ApiEnergy />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

function App() {
  return (
    <ThemeProviderApi>
      <AppContent />
    </ThemeProviderApi>
  );
}

export default App;
