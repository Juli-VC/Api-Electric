import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export default function CardFeature({ cardContent, sx }) {
    return (

        <Card
            sx={{
                minWidth: 300,
                minHeight: 150,
                maxWidth: 800,
                // maxHeight: 440,
                bgcolor: "transparent",
                border: "none",
                borderRadius: "20px",
                margin: "5px 0",
                padding: "20px",

                bgcolor: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.01)",
                boxShadow: "0 4px 3px rgba(69, 71, 69, 0.5)",
                color: 'whitesmoke',
                ...sx,
            }}>{cardContent ? cardContent : ""}
        </Card>

    );
}
