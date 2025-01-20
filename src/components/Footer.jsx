import React, { useState } from "react";
import { Box, Typography, Grid, Button, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../context/AuthContext";

const Footer = ({ setUsername, setPassword, setErrorLoginMessage }) => {
    const users = [
        { username: "johnd", password: "m38rmF$", valid: true },
        { username: "mor_2314", password: "qwerty123", valid: true },
        { username: "kevin_45", password: "passw0rd", valid: true },
        { username: "invalid_user", password: "wrongPass123", valid: false },
    ];
    const [notification, setNotification] = useState("");

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
                color: "whitesmoke",
                py: 2,
                px: 10,
                mt: 4,
                mx: 30,
                textAlign: "center",
                backgroundImage: 'linear-gradient(to top, #16222A 100%, rgb(37, 62, 74) 10%)',
                borderBottomLeftRadius: "40px",
                borderBottomRightRadius: "40px",
                boxShadow: '1px 2px  rgba(26, 161, 51, 0.5)',
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
            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                {/* Usuarios válidos */}
                <Grid item xs={12} lg={6} >
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
                                    mb: 1,
                                    p: 2,
                                    bgcolor: "background.paper",
                                    color: "teal",
                                    borderRadius: 2,
                                }}
                            >
                                <Box>
                                    <Tooltip title="Copiar usuario">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", mr: 1 }}
                                            onClick={() => handleCopy(user.username)}
                                        >
                                            Usuario: <strong style={{ display: "inline", cursor: "pointer", mr: 1, border: "1px solid green", borderRadius: "4px", padding: "3px" }}>{user.username}</strong>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title="Copiar contraseña">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", ml: 1 }}
                                            onClick={() => handleCopy(user.password)}
                                        >
                                            Contraseña: <strong style={{ display: "inline", cursor: "pointer", mr: 1, border: "1px solid green", borderRadius: "4px", padding: "3px" }}>{user.password}</strong>
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
                <Grid item xs={12} lg={6} >
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
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                    p: 2,
                                    bgcolor: "background.paper",
                                    borderRadius: 2,
                                    color: "darkred"
                                }}
                            >
                                <Box>
                                    <Tooltip title="Copiar usuario">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", mr: 1 }}
                                            onClick={() => handleCopy(user.username)}
                                        >
                                            Usuario: <strong style={{ display: "inline", cursor: "pointer", mr: 1, border: "1px solid darkred", borderRadius: "4px", padding: "3px" }}>{user.username}</strong>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title="Copiar contraseña">
                                        <Typography
                                            variant="body1"
                                            sx={{ display: "inline", cursor: "pointer", ml: 1 }}
                                            onClick={() => handleCopy(user.password)}
                                        >
                                            Contraseña: <strong style={{ display: "inline", cursor: "pointer", mr: 1, border: "1px solid darkred", borderRadius: "4px", padding: "3px" }}>{user.password}</strong>
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
