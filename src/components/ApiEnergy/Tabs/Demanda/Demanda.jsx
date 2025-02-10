import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import CardFeature from '../../CardFeature';
import { Demanda_Variation } from './Demanda_Variation';
import { Padding } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import DatePickerSimple from '../../DatePickerSimple';
import { Demanda_PotenciaInstaladaChart } from './Demanda_PotenciaInstalada';


const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export default function Demanda() {
    const [selectedDate, setSelectedDate] = useState(2024);
    return (
        <Grid container spacing={3} sx={{ justifyContent: "space-evenly" }}>

            <Grid size={12}>
                <Typography variant="h4" align="center" gutterBottom>
                    Demanda
                </Typography>
            </Grid>
            <Grid size={12}>
                <Box mb={2} display="flex" justifyContent="center">
                    <DatePickerSimple selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 11 }} sx={{ display: "flex", justifyContent: "center", }}>
                <CardFeature sx={{
                    maxWidth: 1000, maxHeight: 500, paddingBottom: "80px", width: "100%"
                }} cardContent={<Demanda_Variation selectedDate={selectedDate} />} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center", }}>
                <CardFeature sx={{ minHeight: "500px", minWidth: "600px", maxHeight: "500px", maxWidth: "none", }} cardContent={<Demanda_PotenciaInstaladaChart selectedDate={selectedDate} />} />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex", justifyContent: "center", }}>
                <CardFeature />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center", }}>
                <CardFeature />
            </Grid>
        </Grid>
    )
}