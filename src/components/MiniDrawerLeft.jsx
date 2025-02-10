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
import { useTheme } from "../theme/ThemeProvider";

const drawerWidth = 180;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open, isSmallScreen, customTheme }) => ({
        width: isSmallScreen ? "100%" : open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",

        "& .MuiDrawer-paper": {
            width: isSmallScreen ? "100%" : open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            background: isSmallScreen ? customTheme.theme.colors.navbsMiniBgColor : customTheme.theme.colors.navbsBgColor,
            color: customTheme.theme.colors.text,
            borderTopLeftRadius: isSmallScreen ? "0" : "90px",
            borderBottomLeftRadius: isSmallScreen ? "0" : "90px",
            position: isSmallScreen ? "fixed" : "fixed",
            top: isSmallScreen ? "85px" : "50%",
            left: isSmallScreen ? "0" : "2%",
            transform: isSmallScreen ? "none" : "translateY(-50%)",
            height: "auto",
            padding: isSmallScreen ? 0 : "1% 0",
            borderTop: isSmallScreen ? "none" : `6px solid ${customTheme.theme.colors.primary}`,
            borderBottom: isSmallScreen ? "none" : `6px solid ${customTheme.theme.colors.primary}`,
            borderLeft: isSmallScreen ? "none" : `1px solid ${customTheme.theme.colors.primary}`,
            borderRight: isSmallScreen ? "none" : `3px dashed ${customTheme.theme.colors.primary}`,
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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const customTheme = useTheme();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDrawerToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleTabDrawer = (tabname) => {
        setshowTab(tabname);
        if (isSmallScreen) setIsMenuOpen(false);
    };

    const handleMouseEnter = () => {
        if (!isSmallScreen) setOpen(true);
    };

    const handleMouseLeave = () => {
        if (!isSmallScreen) setOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
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
                customTheme={customTheme}
            >
                {!isSmallScreen && (
                    <><DrawerHeader>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: customTheme.theme.colors.primary, }}>
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
                                    <ListItemIcon sx={{ color: customTheme.theme.colors.primary, }}>
                                        {tabsDrawerNames.find((tab) => tab.name === showTab)?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={showTab} sx={{ color: customTheme.theme.colors.text, }} />
                                </ListItemButton>
                                <IconButton sx={{ color: customTheme.theme.colors.primary, }}>
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
                                                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", color: customTheme.theme.colors.primary, }}>
                                                    {tab.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={tab.name} sx={{ opacity: 1, color: showTab === tab.name ? customTheme.theme.colors.secondary : customTheme.theme.colors.text }} />
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
                                        backgroundColor: showTab === tab.name ? "rgba(2, 8, 1, 0.9)" : "transparent",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: "center",
                                            color: customTheme.theme.colors.primary,
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
