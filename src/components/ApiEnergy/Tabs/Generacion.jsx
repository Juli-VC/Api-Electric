import { Line, Bar } from "react-chartjs-2";
import { Box, Button, ButtonGroup, CircularProgress, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { exportCsv } from "../../../utils/exportCsv";
import DatePickerSimple from "../DatePickerSimple";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import GeneracionEvolucion from "./Generacion/EvolucionRenovNoRenovables";
import CardFeature from "../CardFeature";

// Registrar las escalas necesarias
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement,
    LineElement,);


export const Generacion = () => {
    const [chartData, setChartData] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [unitChange, setUnitChange] = useState(1);
    const [timeTrunc, setTimeTrunc] = useState("day");
    const [dataCards, setDataCards] = useState({ eolica: 0, solar: 0, hidraulica: 0 });
    // const [selectedDate, setSelectedDate] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(2024);


    const startDate = `${selectedDate}-01-01T00:00`;
    const endDate = `${selectedDate}-12-31T23:59`;

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const url = `https://apidatos.ree.es/es/datos/generacion/estructura-generacion?start_date=${startDate}&end_date=${endDate}&time_trunc=${timeTrunc}&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`;

            try {
                const response = await axios.get(url);
                const apiData = response.data;

                if (apiData?.included?.length) {
                    const datasets = apiData.included.map((item) => ({
                        label: item.attributes.title,
                        data: item.attributes.values.map((value) =>
                            unitChange === 1 ? value.value / 1000 : (value.percentage * 100).toFixed(2)
                        ),
                        backgroundColor: item.attributes.color,
                        type: item.attributes.title === "Generación total" ? "line" : "bar",
                        order: item.attributes.title === "Generación total" ? 1 : 2,
                        borderColor: "lime",
                        tension: 0.4,
                    }));

                    const labels = apiData.included[0].attributes.values.map((v) =>
                        v.datetime.split("T")[0]
                    );

                    setChartData({ labels, datasets });
                    setResponseData(apiData);

                    const eolica = apiData.included.find(
                        (item) => item.attributes.title === "Eólica"
                    )?.attributes.values[0]?.percentage || 0;
                    const solar = apiData.included.find(
                        (item) => item.attributes.title === "Solar fotovoltaica"
                    )?.attributes.values[0]?.percentage || 0;
                    const hidraulica = apiData.included.find(
                        (item) => item.attributes.title === "Hidráulica"
                    )?.attributes.values[0]?.percentage || 0;

                    setDataCards({
                        eolica: parseFloat(eolica * 100).toFixed(2),
                        solar: parseFloat(solar * 100).toFixed(2),
                        hidraulica: parseFloat(hidraulica * 100).toFixed(2),
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [unitChange, timeTrunc, selectedDate]);

    return (
        <Box >
            <Typography variant="h4" align="center" gutterBottom>
                Datos de Generación
            </Typography>

            <Box mb={5} mt={5} display="flex" justifyContent="center" >
                <DatePickerSimple selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </Box>

            {
                isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <CircularProgress color="success" size={50} thickness={5} />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}  >
                            {/* 3 cards infor energy (Eolic, solar, hydro) */}
                            <Grid size={{ xs: 12 }}>
                                <Grid container spacing={1} justifyContent="space-evenly" >
                                    {["eolica", "solar", "hidraulica"].map((key, idx) => (
                                        <Grid xs={4} key={idx} p={0} height={"100%"} >
                                            <CardFeature key={idx} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }} cardContent={
                                                <>
                                                    <Typography variant="h5" color="primary" gutterBottom >
                                                        {dataCards[key]} %
                                                    </Typography>
                                                    <Typography variant="overline" sx={{ fontWeight: "600", fontSize: "16px", color: "darkcyan" }}>
                                                        {key === "eolica"
                                                            ? "Generación Eólica"
                                                            : key === "solar"
                                                                ? "Generación Solar"
                                                                : "Generación Hidráulica"}
                                                    </Typography>
                                                </>
                                            } />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            {/* Graphic: Generation daily */}
                            <Grid size={{ xs: 12, xl: 6 }}   >
                                <CardFeature cardContent={
                                    <>
                                        <Grid display="flex" justifyContent="space-between" alignItems="center" container spacing={2} mb={2}>
                                            <ButtonGroup size="small" aria-label="Change Units Buttons" >
                                                <Button
                                                    variant={unitChange === 2 ? "contained" : "outlined"}
                                                    onClick={() => setUnitChange(2)}
                                                >
                                                    %
                                                </Button>
                                                <Button
                                                    variant={unitChange === 1 ? "contained" : "outlined"}
                                                    onClick={() => setUnitChange(1)}
                                                >
                                                    GWh
                                                </Button>
                                            </ButtonGroup>
                                            <ButtonGroup size="small" aria-label="Change Units Buttons" >
                                                <Button
                                                    variant={timeTrunc === "day" ? "contained" : "outlined"}
                                                    onClick={() => setTimeTrunc("day")}
                                                >
                                                    Diario
                                                </Button>
                                                <Button
                                                    variant={timeTrunc === "month" ? "contained" : "outlined"}
                                                    onClick={() => setTimeTrunc("month")}
                                                >
                                                    Mensual
                                                </Button>
                                                <Button
                                                    variant={timeTrunc === "year" ? "contained" : "outlined"}
                                                    onClick={() => setTimeTrunc("year")}
                                                >
                                                    Anual
                                                </Button>
                                            </ButtonGroup>


                                        </Grid>

                                        <Box>
                                            <Bar
                                                data={chartData}
                                                options={{
                                                    responsive: true,
                                                    indexAxis: "x",
                                                    scales: {
                                                        x: {
                                                            stacked: true,
                                                            ticks: {
                                                                beginAtZero: true,
                                                            },
                                                        },
                                                        y: {
                                                            stacked: true,
                                                            min: 0,
                                                            ticks: {
                                                                beginAtZero: true,
                                                                stepSize: unitChange === 1 ? 100 : 10, // GWh o %
                                                            },
                                                            max: unitChange === 2 ? 100 : undefined, // Limita a 100 si es porcentaje
                                                            title: {
                                                                display: true,
                                                                text: unitChange === 1 ? "GWh" : "%",
                                                                font: {
                                                                    weight: "bold",
                                                                },
                                                            },
                                                        },
                                                    },
                                                    plugins: {
                                                        legend: {
                                                            position: "bottom",
                                                        },
                                                        tooltip: {
                                                            callbacks: {
                                                                label: function (context) {
                                                                    const label = context.dataset.label || "";
                                                                    const value = context.parsed.y;
                                                                    return `${label}: ${value} ${unitChange === 1 ? "GWh" : "%"}`;
                                                                },
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                            <Box textAlign="right" mt={2}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => exportCsv(responseData)}
                                                >
                                                    Exportar a CSV
                                                </Button>
                                            </Box>
                                        </Box>
                                    </>
                                } >
                                </CardFeature>
                            </Grid>
                            {/* Graphic: Evolution Ren_NoRen */}
                            <Grid size={{ xs: 12, xl: 6 }}>
                                <CardFeature cardContent={
                                    <GeneracionEvolucion
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectedDate={selectedDate}
                                    />
                                } >
                                </CardFeature>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </Box >
    );
};
