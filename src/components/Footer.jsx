import React, { useState } from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../theme/ThemeProvider";

const Footer = ({ setUsername, setPassword, setErrorLoginMessage }) => {
    const users = [
        { username: "johnd", password: "m38rmF$", valid: true },
        { username: "mor_2314", password: "qwerty123", valid: true },
        { username: "kevin_45", password: "passw0rd", valid: true },
        { username: "invalid_user", password: "wrongPass123", valid: false },
    ];
    const [notification, setNotification] = useState("");
    const { theme } = useTheme(); // Obtener el tema

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleUseCredentials = (username, password) => {
        setUsername(username);
        setPassword(password);
        setErrorLoginMessage("");

        setNotification(`Usuario ${username} copiado.`);
        setTimeout(() => {
            setNotification("");
        }, 500);
    };

    return (
        <Box
            component="footer"
            sx={{
                color: theme.colors.text,
                py: 2,
                px: { xs: 2, md: 6 },
                mt: 4,
                mx: { xs: 2, md: "auto" },
                maxWidth: "800px",
                textAlign: "center",
                background: theme.colors.navbsMiniBgColor,
                borderBottomLeftRadius: "40px",
                borderBottomRightRadius: "40px",
                borderTop: `1px solid ${theme.colors.primary}`,
                borderBottom: `1px solid ${theme.colors.primary}`,
                borderLeft: `6px dashed ${theme.colors.primary}`,
                borderRight: `6px dashed ${theme.colors.primary}`
            }}
        >
            <Typography variant="h6" gutterBottom>
                Usuarios de Prueba
            </Typography>

            {notification && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "15%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "teal",
                        color: "white",
                        borderRadius: "5px",
                        p: 2,
                        boxShadow: 3,
                        zIndex: 9999,
                    }}
                >
                    <Typography variant="body1">{notification}</Typography>
                </Box>
            )}
            <Grid container spacing={0} sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Usuarios válidos */}
                <Grid size={{ xs: 12, lg: 9 }} >
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Usuarios válidos
                    </Typography>
                    {users
                        .filter((user) => user.valid)
                        .map((user, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 0,
                                    p: 1,
                                    bgcolor: theme.colors.bgcolor,
                                    color: theme.colors.text,
                                    borderRadius: 2,
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    bgcolor: theme.colors.bgcolor,
                                }}>
                                    <Tooltip title="Copiar usuario">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", mr: 1 }}
                                            onClick={() => handleCopy(user.username)}
                                        >
                                            Usuario: <strong>{user.username}</strong>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title="Copiar contraseña">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", ml: 1 }}
                                            onClick={() => handleCopy(user.password)}
                                        >
                                            Contraseña: <strong>{user.password}</strong>
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={() => handleUseCredentials(user.username, user.password)}
                                >
                                    Usar credenciales
                                </Button>
                            </Box>
                        ))}
                </Grid>

                {/* Usuario inválido */}
                <Grid size={{ xs: 12, lg: 3 }} >
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Usuario incorrecto
                    </Typography>
                    {users
                        .filter((user) => !user.valid)
                        .map((user, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    bgcolor: theme.colors.bgcolor,
                                    color: "darkred",
                                    borderRadius: 2,
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "10px"
                                }}>
                                    <Tooltip title="Copiar usuario">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", }}
                                            onClick={() => handleCopy(user.username)}
                                        >
                                            Usuario: <strong>{user.username}</strong>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title="Copiar contraseña">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", }}
                                            onClick={() => handleCopy(user.password)}
                                        >
                                            Contraseña: <strong>{user.password}</strong>
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    startIcon={<ErrorIcon />}
                                    onClick={() => handleUseCredentials(user.username, user.password)}
                                >
                                    Usar
                                </Button>
                            </Box>
                        ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
