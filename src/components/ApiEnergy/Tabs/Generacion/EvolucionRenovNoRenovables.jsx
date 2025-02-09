import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTheme } from '../../../../theme/ThemeProvider';

const GeneracionEvolucion = ({ startDate, endDate, selectedDate, }) => {

    const [isLoadingEvolutionGraph, setIsLoadingEvolutionGraph] = useState(true);
    const [unitChangeEvolution, setUnitChangeEvolution] = useState(1); // 1 = GWh, 2 = %
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Renovable",
                data: [],
                borderColor: "#92d050",
                backgroundColor: "rgba(146, 208, 80, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "No Renovable",
                data: [],
                borderColor: "#666666",
                backgroundColor: "rgba(102, 102, 102, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    });
    const { theme } = useTheme();

    useEffect(() => {
        setIsLoadingEvolutionGraph(true)
        const fetchData = async () => {

            try {
                const url = `https://apidatos.ree.es/es/datos/generacion/evolucion-renovable-no-renovable?start_date=${selectedDate}-01-01T00:00&end_date=${selectedDate}-12-31T23:59&time_trunc=month&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data || !data.included) {
                    throw new Error("La respuesta de la API no contiene los datos esperados.");
                }

                // Procesar datos del JSON
                const renovables = data.included?.find(item => item.type === "Renovable");
                const noRenovables = data.included?.find(item => item.type === "No renovable");

                const months = renovables?.attributes?.values?.map(item =>
                    new Date(item.datetime).toLocaleString("default", { month: "short" })
                ) || [];

                const renovableValues = renovables?.attributes?.values?.map(item =>
                    unitChangeEvolution === 1 ? item.value / 1_000_000 : item.percentage * 100
                ) || [];

                const noRenovableValues = noRenovables?.attributes?.values?.map(item =>
                    unitChangeEvolution === 1 ? item.value / 1_000_000 : item.percentage * 100
                ) || [];

                // Configuración del Chart
                setChartData({
                    labels: months,
                    datasets: [
                        {
                            label: "Renovable",
                            data: renovableValues,
                            borderColor: "rgb(55, 181, 223)",
                            backgroundColor: "rgba(146, 208, 80, 0.2)",
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: "No Renovable",
                            data: noRenovableValues,
                            borderColor: "rgb(241, 171, 8)",
                            backgroundColor: "rgba(102, 102, 102, 0.2)",
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);

            } finally {
                setIsLoadingEvolutionGraph(false);

            }
        };

        fetchData();
    }, [selectedDate, unitChangeEvolution]);

    // Cambiar unidades
    const handleUnitChangeEvolution = () => {
        setUnitChangeEvolution(prev => (prev === 1 ? 2 : 1));
    };
    return isLoadingEvolutionGraph ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress color="success" size={50} thickness={5} />
        </Box>
    ) : (
        <div>
            <h3>Evolución de la Generación Renovable y No Renovable</h3>
            <p>Datos obtenidos desde {new Date(startDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} al {new Date(endDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>


            {chartData.datasets.length > 0 ?
                (<>
                    <Button variant="contained" color="success" onClick={handleUnitChangeEvolution} style={{ margin: "10px 0" }}>
                        Cambiar a {unitChangeEvolution === 1 ? "%" : "GWh"}
                    </Button>

                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: `Evolución de la generación (${unitChangeEvolution === 1 ? "GWh" : "%"})`,
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: unitChangeEvolution === 1 ? "GWh" : "%",
                                    },
                                    grid: {
                                        display: true,
                                        color: theme.colors.primary,
                                    },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: "Meses",
                                    },
                                    grid: {
                                        display: true,
                                        color: theme.colors.primary,
                                    },
                                },
                            },
                        }}
                    />
                </>) : (<p>Cargando datos...</p>)
            }
        </div>
    );
};

export default GeneracionEvolucion;
