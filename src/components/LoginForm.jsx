import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = ({ username, setUsername, password, setPassword, setErrorLoginMessage, errorLoginMessage }) => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorLoginMessage("");
        setLoading(true);
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username,
                password,
            });
            Cookies.set("authToken", response.data.token, { expires: 7, secure: true });
            login(response.data); // Llama al contexto de autenticación con los datos
            alert("¡Inicio de sesión exitoso!");
            navigate("/api-energy"); // Redirige a la página de la API de energía
        } catch (error) {
            setErrorLoginMessage("Credenciales incorrectas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                width: "100%",
                maxWidth: 400,
                margin: "0 auto",
                mt: 4,
                padding: 4,
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="h1" textAlign="center" mb={3}>
                Iniciar Sesión
            </Typography>

            {errorLoginMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorLoginMessage}
                </Alert>
            )}

            <TextField
                label="Usuario"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ paddingY: 1.5 }}
            >
                {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={2}
            >
                ¿No tienes cuenta? Usa las credenciales de prueba proporcionadas.
            </Typography>
        </Box>
    );
};

export default LoginForm;
