import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTheme } from '../../theme/ThemeProvider';


export default function CardFeature({ cardContent, sx }) {
    const { theme } = useTheme();
    return (

        <Card
            sx={{
                minWidth: 300,
                minHeight: 150,
                maxWidth: 800,
                borderRadius: "20px",
                margin: "5px 0",
                padding: "30px",

                backdropFilter: "blur(10px)",
                bgcolor: theme.colors.bgcolor,
                color: theme.colors.text,
                border: `0,1px solid ${theme.colors.primary}`,
                boxShadow: `0 4px 6px ${theme.colors.primary}80`,
                // animation if future clickable
                // transition: "all 0.3s ease-in-out",
                // "&:hover": {
                //     boxShadow: `0 6px 10px ${theme.colors.primary}90`, // Sombra más intensa en hover
                //     transform: "translateY(-3px)",
                // },
                ...sx,
            }}>{cardContent ? cardContent : ""}
        </Card>

    );
}
