import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Bar } from "react-chartjs-2";
import DatePickerSimple from "../../DatePickerSimple";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";

// Registrar las escalas necesarias para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Demanda_Variation = ({ selectedDate }) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const startDate = `${selectedDate}-01-01T00:00`;
    const endDate = `${selectedDate}-12-31T23:59`;

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const url = `https://apidatos.ree.es/es/datos/demanda/variacion-componentes?start_date=${startDate}&end_date=${endDate}&time_trunc=month&geo_limit=peninsular`;

            try {
                const response = await axios.get(url);
                const apiData = response.data;
                console.log("apiData", apiData);


                if (apiData?.included?.length) {
                    const datasets = apiData.included.map((item) => ({
                        label: item.attributes.title,
                        data: item.attributes.values.map((value) => parseFloat((value.value * (!item.attributes.title.includes("Variación") ? 10 : 1)).toFixed(2))),
                        backgroundColor: item.attributes.color,
                        borderColor: item.attributes.color,
                        borderWidth: 1,
                        // Permitir que los valores negativos se apilen hacia abajo
                    }));

                    const labels = apiData.included[0].attributes.values.map((v) =>
                        new Date(v.datetime).toLocaleDateString("es-ES", { month: "short", year: "numeric" })
                    );

                    // Encontrar el valor mínimo en los datasets para ajustar el eje Y
                    const minYValue = Math.min(...datasets.flatMap(dataset => dataset.data)) - 10;
                    console.log("minYValue", minYValue);

                    setChartData({
                        labels,
                        datasets: datasets.map((dataset, idx) => ({
                            ...dataset,
                            stack: `stack-${idx}`, // Definir un grupo de apilamiento único por dataset
                        })),
                        minYValue, // Pasar el valor mínimo calculado al chartData
                    });
                    console.log("datasets", datasets);
                }
            } catch (error) {
                console.error(error);
            } finally {

                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    return (
        <Box>

            {isLoading || !chartData ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress color="success" size={50} thickness={5} />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                    <h3>Variación de la Demanda ({selectedDate})</h3>
                    <Bar
                        data={{
                            labels: chartData.labels,
                            datasets: chartData.datasets,
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const label = context.dataset.label || "";
                                            const value = context.raw;
                                            return `${label}: ${value}%`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    stacked: true, // Apilar barras en el eje x
                                    title: {
                                        display: true,
                                        text: "Mes",
                                    },
                                },
                                y: {
                                    beginAtZero: false, // Permitir que el eje y tenga valores negativos
                                    stacked: true, // Apilar valores en el eje y
                                    min: chartData.minYValue, // Usar el valor mínimo calculado para el eje Y
                                    title: {
                                        display: true,
                                        text: "%",
                                    },
                                },
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};
