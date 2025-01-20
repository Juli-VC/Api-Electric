import Grid from '@mui/material/Grid2';
import React from 'react'
import CardFeature from '../CardFeature'
import { useEffect, useState } from "react";
import axios from "axios";
import BalanceTable from './Balance/BalanceTable';
import { BalanceGraphicalTable } from './Balance/BalanceGraphicalTable';
import BalancePieChart from './Balance/BalancePieChart';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { BalanceNotes } from './Balance/BalanceNotes';
import { Box, Button, ButtonGroup, CircularProgress, Divider, Stack } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Balance() {
    const [balanceData, setBalanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTabView, setShowTabView] = useState(1); // 1 para tabla normal, 2 para gráfica
    const [dataByTitle, setDataByTitle] = useState({});
    const [generacionTotal, setGeneracionTotal] = useState(0);

    // Define columnas basadas en los años
    const startDate = "2024-01-01";
    const endDate = "2024-01-31";

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2024-01-01T00:00&end_date=2024-12-31T23:59&time_trunc=year")
            .then((response) => {
                const includedData = response.data?.included || [];
                setBalanceData(includedData);

                // Gestión de datos
                const dataByTitle = {};

                if (includedData) {
                    includedData?.forEach(item => {
                        const title = item.attributes.title;
                        const names = item.attributes.content;

                        // Si el título no existe en el objeto, crear un array vacío para ese título
                        if (!dataByTitle[title]) {
                            dataByTitle[title] = [];
                        }

                        // Iterar sobre los valores y agregarlos al array correspondiente
                        names.forEach((n, index) => {
                            dataByTitle[title].push({ "tipo": n.type, "valor": n.attributes.values });
                        });
                    });
                    setDataByTitle(dataByTitle);
                }


                //Calculamos el total de Generación elect. Lo necesitamos para los %.
                const totalGeneracion = parseInt(
                    (
                        (dataByTitle["Renovable"]?.slice(-1)[0]?.valor[0]?.value || 0) +
                        (dataByTitle["Renovable"]?.slice(-1)[0]?.valor[1]?.value || 0) +
                        (dataByTitle["No-Renovable"]?.slice(-1)[0]?.valor[0]?.value || 0) +
                        (dataByTitle["No-Renovable"]?.slice(-1)[0]?.valor[1]?.value || 0)
                    ) / 1000
                );

                setGeneracionTotal(totalGeneracion);

                // Ordenar las columnas de Renovable y No Renovable según el valor más alto
                Object.values(dataByTitle).forEach(values => {
                    values.sort((a, b) => {
                        // Verificar si valor[1] existe antes de acceder a él
                        const valueA = (a.valor[0]?.value || 0) + (a.valor[1]?.value || 0); // Usar 0 si no existe valor[1]
                        const valueB = (b.valor[0]?.value || 0) + (b.valor[1]?.value || 0); // Usar 0 si no existe valor[1]

                        // Realizar la comparación
                        return parseInt(valueB) - parseInt(valueA);
                    });
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching balance data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress color="success" size={50} thickness={5} />
        </Box>;
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 1, md: 4 }} sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "center", xl: "space-between" },
            alignItems: { xs: "center", lg: "start" },
        }}>
            <Grid size={12} textAlign={"center"}>
                <h2>Balance eléctrico (GWh) | Sistema eléctrico: peninsular</h2>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ justifyContent: "center" }}>
                {/* Buttons Table/Graphic */}
                <Stack
                    spacing={2} direction={"row"} sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "35px",
                        paddingBottom: "10px",
                        borderBottom: "4px solid transparent",
                        borderImage: "linear-gradient(to right, transparent 25%, limegreen 50%, transparent 75%) 1",

                    }} divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "limegreen" }} />}
                    aria-label="Change table or graphic" >
                    <Button size='medium' variant={showTabView === 2 ? "outlined" : "contained"} color='success' onClick={() => setShowTabView(1)}>Tabla</Button>
                    <Button size='medium' variant={showTabView !== 2 ? "outlined" : "contained"} color='success' onClick={() => setShowTabView(2)}>Gráfica</Button>
                </Stack>
                {/* TabsContent - Table / Graphic */}
                {showTabView === 1 && <BalanceTable startDate={startDate} endDate={endDate} dataByTitle={dataByTitle} />}
                {showTabView === 2 && <BalanceGraphicalTable dataByTitle={dataByTitle} generacionTotal={generacionTotal} />}
            </Grid>
        </Grid>
    );
}
