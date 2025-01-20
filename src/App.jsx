import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Importa el contexto de autenticación
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ApiEnergy from "./pages/ApiEnergy";
import NotFound from "./pages/NotFound";
import AppBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  return (
    <Router>
      <AppBar />
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
    </Router>
  );
}

export default App;
