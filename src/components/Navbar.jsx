import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";



function ResponsiveAppBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const customTheme = useTheme();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = user == null ? [{ label: "Sobre esta web", path: "/about" }] : [
        { label: "Sobre esta web", path: "/about" },
        { label: "FAQ", path: "/faq" },
        { label: "Api-Energy", path: "/api-energy" },
    ];
    const settings = [
        { label: "Perfil usuario", path: "/profile" },
        { label: "Account", path: "/account" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "Cerrar sesión", action: "logout" },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleUserMenuClick = (setting) => {
        if (setting.action === "logout") {
            logout();
            navigate("/");
        } else if (setting.path) {
            navigate(setting.path);
        }
        handleCloseUserMenu();
    };

    return (
        <AppBar
            position={user ? 'sticky' : 'static'}
            enableColorOnDark
            sx={{
                margin: '0 auto',
                width: '55%',
                mt: 'calc(var(--template-frame-height, 0px) + 18px)',
                // backgroundImage: 'linear-gradient(to bottom, #3A6073, #16222A)',
                // borderTopLeftRadius: "40px",
                // borderTopRightRadius: "40px",
                // boxShadow: '-1px -2px  rgba(26, 161, 51, 0.5)',
                background: customTheme.theme.colors.navbsMiniBgColor,
                borderRadius: "90px",
                borderTop: `1px solid ${customTheme.theme.colors.primary}`,
                borderBottom: `1px solid ${customTheme.theme.colors.primary}`,
                borderLeft: `8px dashed ${customTheme.theme.colors.primary}`,
                borderRight: `8px dashed ${customTheme.theme.colors.primary}`,
            }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters variant="dense">
                    <AdbIcon sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => handleNavigation("/")}
                        sx={{
                            mr: 2,
                            display: { xs: "none", lg: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        ApiElectric
                    </Typography>

                    {/* Menú móvil */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={() => handleNavigation(page.path)}>
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Menú escritorio */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" }, justifyContent: "center" }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleNavigation(page.path)}
                                sx={{
                                    my: 2, color: "white", display: "block",
                                    borderBottom: location.pathname === page.path ? `3px dashed ${customTheme.theme.colors.primary}` : "none",
                                }}

                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Menú usuario */}
                    {user && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={() => handleUserMenuClick(setting)}>
                                    <Typography textAlign="center">{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
