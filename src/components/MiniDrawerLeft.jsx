import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    AccountBalance as AccountBalanceIcon,
    BarChart as BarChartIcon,
    FlashOn as FlashOnIcon,
    ImportExport as ImportExportIcon,
    LocalShipping as LocalShippingIcon,
    MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";

const drawerWidth = 180;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open, isSmallScreen }) => ({
        width: isSmallScreen ? "100%" : open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",

        "& .MuiDrawer-paper": {
            width: isSmallScreen ? "100%" : open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            backgroundImage: "linear-gradient(to right, rgb(40, 68, 82) 10%, #16222A 80%)",
            color: "whitesmoke",
            borderTopLeftRadius: isSmallScreen ? "0" : "90px",
            borderBottomLeftRadius: isSmallScreen ? "0" : "90px",
            position: isSmallScreen ? "fixed" : "fixed", // Si es pequeña, fijamos la posición
            top: isSmallScreen ? "70px" : "50%", // Ajusta este valor para que esté debajo del AppBar (64px si es estándar)
            left: isSmallScreen ? "0" : "2%",
            transform: isSmallScreen ? "none" : "translateY(-50%)",
            height: "auto",
            padding: isSmallScreen ? 0 : "2% 0",
            boxShadow: isSmallScreen ? "0px 4px 10px rgba(0,0,0,0.2)" : "-2px -1px rgba(26, 161, 51, 0.5)",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
            }),
        },
    })
);

const tabsDrawerNames = [
    { name: "Balance", icon: <AccountBalanceIcon /> },
    { name: "Demanda", icon: <BarChartIcon /> },
    { name: "Generación", icon: <FlashOnIcon /> },
    { name: "Intercambios", icon: <ImportExportIcon /> },
    { name: "Transporte", icon: <LocalShippingIcon /> },
    { name: "Mercados", icon: <MonetizationOnIcon /> },
];

export default function MiniDrawer({ showTab, setshowTab }) {
    const [open, setOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Para controlar el despliegue del menú en pantallas pequeñas.

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDrawerToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleTabDrawer = (tabname) => {
        setshowTab(tabname);
        if (isSmallScreen) setIsMenuOpen(false); // Cierra el menú en pantallas pequeñas al seleccionar una tab.
    };

    const handleMouseEnter = () => {
        if (!isSmallScreen) setOpen(true);
    };

    const handleMouseLeave = () => {
        if (!isSmallScreen) setOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState); // Alterna el estado del menú en pantallas pequeñas.
    };

    return (
        <Box
            sx={{ display: "flex" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Drawer
                variant="permanent"
                open={open || isSmallScreen}
                isSmallScreen={isSmallScreen}
            >
                {!isSmallScreen && (
                    <><DrawerHeader>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: "lime" }}>
                            {open ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                        </IconButton>
                    </DrawerHeader>
                        <Divider /></>
                )}
                <List>
                    {/* Si estamos en pantalla pequeña, solo mostramos la tab activa al principio */}
                    {isSmallScreen ? (
                        <>
                            <ListItem disablePadding sx={{ display: "flex", justifyContent: "center", padding: "0" }} onClick={() => { toggleMenu(); handleDrawerToggle(); }}>
                                <ListItemButton sx={{ padding: "0, 5px" }}  >
                                    <ListItemIcon sx={{ color: "lime" }}>
                                        {tabsDrawerNames.find((tab) => tab.name === showTab)?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={showTab} sx={{ color: "lime" }} />
                                </ListItemButton>
                                <IconButton sx={{ color: "lime" }}>
                                    {open ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                                </IconButton>
                            </ListItem>
                            {isMenuOpen && (
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    {tabsDrawerNames.map((tab, index) => (
                                        <ListItem key={index} disablePadding sx={{ display: "block" }}>
                                            <ListItemButton
                                                onClick={() => { toggleMenu(); handleDrawerToggle(); handleTabDrawer(tab.name) }}
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "initial",
                                                    px: 2.5,
                                                    "&:hover": {
                                                        backgroundColor: "rgba(17, 16, 17, 0.9)",
                                                    },
                                                    backgroundColor: showTab === tab.name ? "rgba(17, 16, 17, 0.9)" : "transparent",
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", color: "lime" }}>
                                                    {tab.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={tab.name} sx={{ opacity: 1 }} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </Box>
                            )}
                        </>
                    ) : (
                        // Comportamiento normal para pantallas grandes
                        tabsDrawerNames.map((tab, index) => (
                            <ListItem key={index} disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    onClick={() => handleTabDrawer(tab.name)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                        "&:hover": {
                                            backgroundColor: "rgba(17, 16, 17, 0.9)",
                                        },
                                        backgroundColor: showTab === tab.name ? "rgba(17, 16, 17, 0.9)" : "transparent",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: "center",
                                            color: "lime",
                                            mr: open ? 3 : "auto",
                                        }}
                                    >
                                        {tab.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={tab.name}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    )}
                </List>
            </Drawer>
        </Box>
    );
}
