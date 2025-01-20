import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    AccountBalance as AccountBalanceIcon,
    BarChart as BarChartIcon,
    FlashOn as FlashOnIcon,
    ImportExport as ImportExportIcon,
    LocalShipping as LocalShippingIcon,
    MonetizationOn as MonetizationOnIcon
} from "@mui/icons-material";

const tabsDrawerNames = [
    { name: "Balance", icon: <AccountBalanceIcon /> },
    { name: "Demanda", icon: <BarChartIcon /> },
    { name: "Generación", icon: <FlashOnIcon /> },
    { name: "Intercambios", icon: <ImportExportIcon /> },
    { name: "Transporte", icon: <LocalShippingIcon /> },
    { name: "Mercados", icon: <MonetizationOnIcon /> }
];

const drawerWidth = 180;

export default function PermanentDrawerLeft({ setshowTab }) {

    return (
        <Box sx={{
            display: 'flex',

        }}>
            <Drawer
                sx={{

                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'transparent',
                        justifyContent: 'center',
                        color: "whitesmoke",
                        backgroundImage: 'linear-gradient(to right,rgb(40, 68, 82) 10%, #16222A 80%)',
                        borderTopLeftRadius: "90px",
                        borderBottomLeftRadius: "90px",
                        boxShadow: '-2px -1px  rgba(26, 161, 51, 0.5)',
                        height: "75vh",
                        top: "15%",
                        left: "1%"
                    },

                }}
                variant="permanent"
                anchor="left"
            >
                <List >
                    {tabsDrawerNames.map((tab, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(17, 16, 17, 0.9)'
                                }
                            }}
                                onClick={() => setshowTab(tab.name)}
                            >
                                <ListItemIcon sx={{ minWidth: "35px", color: "lime" }}>{tab.icon}</ListItemIcon>
                                <ListItemText primary={tab.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>

        </Box>
    );
}
