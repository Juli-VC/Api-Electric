import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, layouts } from 'chart.js';
import { Box } from '@mui/material';
import { useTheme } from '../../../../theme/ThemeProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Demanda_PotenciaInstaladaChart = ({ selectedDate }) => {
    const [chartData, setChartData] = useState({
        labels: [], // Etiquetas para el eje X
        datasets: [], // Los datos que se mostrarán en la gráfica
    });

    const startDate = `${selectedDate}-01-01T00:00`;
    const endDate = `${selectedDate}-12-31T23:59`;
    const { theme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://apidatos.ree.es/es/datos/generacion/potencia-instalada?start_date=${startDate}&end_date=${endDate}&time_trunc=year`
            );
            const data = await response.json();

            // Verificación: asegurarnos de que los datos se han obtenido correctamente
            if (!data.included || data.included.length === 0) {
                console.log('No se han encontrado datos para el año seleccionado');
                return;
            }

            const installedPowerData = data.included;
            console.log(installedPowerData);


            // Filtrar los datos para que no contengan la palabra "Potencia Total"
            const labels = installedPowerData
                .map((item) => item.attributes.title)
                .filter((title) => title !== 'Potencia total'); // Filtramos "Potencia Total" si existe

            const datasets = installedPowerData
                .filter((item) => item.attributes.title !== 'Potencia total') // Aseguramos de no incluir "Potencia Total"
                .map((item) => ({
                    label: item.attributes.title, // Nombre de la categoría
                    data: [item.attributes.total.toFixed(2)], // Valor para esa categoría
                    backgroundColor: item.attributes.color, // Color de la barra
                    borderColor: item.attributes.color,
                    borderWidth: 1,
                    stack: 'stack1', // Para apilar las barras
                    barThickness: 50,
                }));

            setChartData({
                labels: [selectedDate], // Solo un valor para el eje X (el año)
                datasets: datasets, // Establecer los datasets con las barras apiladas
            });
        };

        fetchData();
    }, [selectedDate]); // Dependiendo del año seleccionado, refetch de datos

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right', // Leyenda a la derecha
                align: "center",
                labels: { // Ajusta el tamaño del cuadro de la leyenda
                    usePointStyle: true, // Iconos de la leyenda como puntos
                },
                reverse: true

            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw} MW`;
                    },
                },
            },
        },
        scales: {
            x: {
                labels: [selectedDate],
                stacked: true,
                ticks: {
                    display: true,

                },
                grid: {
                    display: true,
                    color: theme.colors.primary,
                },
            },
            y: {
                beginAtZero: true,
                stacked: true,
                grid: {
                    display: true,
                    color: theme.colors.primary,
                },
            },
        },

    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: "100%", justifyContent: "center", alignItems: "center", }}>
            <h3>Potencia Instalada ({selectedDate})</h3>
            <Bar data={chartData} options={options}
                width={100}
                height={300} />
        </Box>
    );
};
