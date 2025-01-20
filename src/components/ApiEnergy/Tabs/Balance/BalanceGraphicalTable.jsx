import {
    WindPower as WindPowerIcon,
    Opacity as OpacityIcon,
    SolarPower as SolarPowerIcon,
    EnergySavingsLeaf as EnergySavingsLeafIcon,
    WbSunny as WbSunnyIcon,
    RestoreFromTrash as RestoreFromTrashIcon,
    WarningAmber as WarningAmberIcon,
    LocalFireDepartment as LocalFireDepartmentIcon,
    Factory as FactoryIcon,
    DomainDisabled as DomainDisabledIcon,
    HeatPump as HeatPumpIcon,
    DeleteForever as DeleteForeverIcon,
    GasMeter as GasMeterIcon,
    OfflineBoltOutlined as OfflineBoltOutlinedIcon,
    EvStationOutlined as EvStationOutlinedIcon,
    SummarizeOutlined as SummarizeOutlinedIcon,
    AddchartOutlined as AddchartOutlinedIcon
} from "@mui/icons-material";
import { Box, Container, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";
import CardFeature from "../../CardFeature";
import { BalanceNotes } from "./BalanceNotes";

const iconMap = {
    "Eólica": <WindPowerIcon />,
    "Hidráulica": <OpacityIcon />,
    "Solar fotovoltaica": <SolarPowerIcon />,
    "Otras renovables": <EnergySavingsLeafIcon />,
    "Solar térmica": <WbSunnyIcon />,
    "Residuos renovables": <RestoreFromTrashIcon />,
    "Nuclear": <WarningAmberIcon />,
    "Carbón": <LocalFireDepartmentIcon />,
    "Ciclo combinado": <FactoryIcon />,
    "Cogeneración": <DomainDisabledIcon />,
    "Turbinación bombeo": <HeatPumpIcon />,
    "Residuos no renovables": <DeleteForeverIcon />,
    "Fuel + Gas": <GasMeterIcon />,
    "Generación": <OfflineBoltOutlinedIcon />,
    "Consumos en bombeo": <EvStationOutlinedIcon />,
    "Saldo I. internacionales": <SummarizeOutlinedIcon />,
    "Demanda en b.c.": <AddchartOutlinedIcon />
};

export const BalanceGraphicalTable = ({ dataByTitle, generacionTotal }) => {
    console.log("dataByTitle", dataByTitle);
    return (
        <>
            <Grid container spacing={1} sx={{
                justifyContent: { xs: "center", md: "space-evenly", },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "auto auto" },
                gridTemplateRows: { xs: "auto", lg: "auto  1fr auto" },
                gridTemplateAreas: { xs: `"grid1" "grid2" "grid3"`, md: `"grid1 grid2" "grid1 grid3"` },
            }}>
                {/* 2 Columns. Ren-NoRen */}
                <Grid sx={{ gridArea: "grid1", }}>
                    <CardFeature sx={{ maxWidth: "auto" }} cardContent={
                        <Box sx={{ bgcolor: "transparent", borderRadius: 2, p: 1 }}>
                            <Grid container spacing={3} justifyContent="center">
                                {Object.entries(dataByTitle).map(([title, values], index) => (
                                    title.includes("Renovable") && (
                                        <Grid
                                            key={index}
                                            // size={{ xs: 10, sm: 6, md: 4 }}
                                            sx={{
                                                bgcolor: "transparent",
                                                borderRadius: 2,
                                                boxShadow: 2,
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {title}
                                            </Typography>
                                            {values.map((dat, index) => {
                                                const valor0 = dat.valor[0]?.value || 0;
                                                const valor1 = dat.valor[1]?.value || 0;
                                                const total = valor0 + valor1;
                                                const porcentaje = generacionTotal
                                                    ? parseFloat((((total / 1000) / generacionTotal) * 100).toFixed(1))
                                                    : 0;
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            fontWeight="bold"
                                                            sx={{ mb: 1 }}
                                                        >
                                                            {dat.tipo}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                minWidth: "195px",
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                p: 2,
                                                                mb: 2,
                                                                borderRadius: 1,
                                                                bgcolor: dat.tipo.includes("Generación renovable")
                                                                    ? "success.light"
                                                                    : dat.tipo.includes("Generación no")
                                                                        ? "error.dark"
                                                                        : dat.tipo.includes("Demanda en b.c")
                                                                            ? "info.dark"
                                                                            : "rgba(156, 155, 155, 0.18)",
                                                            }}
                                                        >
                                                            {!dat.tipo.includes("Generación") && <Box >{iconMap[dat.tipo]}</Box>}
                                                            <Box >{porcentaje} %</Box>
                                                            <Box >{parseInt(total / 1000).toLocaleString()}</Box>
                                                        </Box>

                                                        {title.includes("Renovable") && (
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={porcentaje}
                                                                sx={{
                                                                    height: 10,
                                                                    borderRadius: 5,
                                                                    backgroundColor: "rgba(174, 171, 171, 0.28)",
                                                                    "& .MuiLinearProgress-bar": {
                                                                        bgcolor: "limegreen",
                                                                    },
                                                                    mb: 2,
                                                                }}
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Grid>)
                                ))}
                            </Grid>
                        </Box>} />
                </Grid>
                {/* Totals colorful. x2 */}
                <Grid sx={{ gridArea: "grid2", }}>
                    <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
                        <CardFeature cardContent={
                            Object.entries(dataByTitle).map(([title, values], index) => (
                                !title.includes("Renovable") && title.includes("Almacenamiento") && (<Grid
                                    key={index}
                                    sx={{
                                        bgcolor: "transparent",
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {title}
                                    </Typography>
                                    {values.map((dat, index) => {
                                        const valor0 = dat.valor[0]?.value || 0;
                                        const valor1 = dat.valor[1]?.value || 0;
                                        const total = valor0 + valor1;
                                        const porcentaje = generacionTotal
                                            ? parseInt((total / generacionTotal) * 100)
                                            : 0;
                                        return (
                                            <React.Fragment key={index}>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{ mb: 1 }}
                                                >
                                                    {dat.tipo}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        p: 2,
                                                        mb: 2,
                                                        borderRadius: 1,
                                                        bgcolor: dat.tipo.includes("Generación renovable")
                                                            ? "success.light"
                                                            : dat.tipo.includes("Generación no")
                                                                ? "error.dark"
                                                                : dat.tipo.includes("Demanda en b.c")
                                                                    ? "info.dark"
                                                                    : "rgba(156, 155, 155, 0.18)",
                                                    }}
                                                >
                                                    <Box>{iconMap[dat.tipo]}</Box>
                                                    <Box>{porcentaje} %</Box>
                                                    <Box>{parseInt(total / 1000).toLocaleString()}</Box>
                                                </Box>
                                            </React.Fragment>
                                        );
                                    })}
                                    {title === "Demanda" && (
                                        <Box
                                            sx={{
                                                py: 2,
                                                px: 1,
                                                borderRadius: 1,
                                                bgcolor: "warning.dark",
                                            }}
                                        >
                                            <Grid container spacing={1} p={1}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}>
                                                <Grid >
                                                    <Typography>{iconMap["Generación"]}</Typography>
                                                    <Typography>Generación Total</Typography>
                                                </Grid>
                                                <Grid >
                                                    <Box>{generacionTotal.toLocaleString()}</Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                                </Grid>)
                            ))
                        } sx={{ minHeight: "410" }} />
                        <CardFeature cardContent={
                            Object.entries(dataByTitle).map(([title, values], index) => (
                                !title.includes("Renovable") && title.includes("Demanda") && (<Grid
                                    key={index}
                                    sx={{
                                        bgcolor: "transparent",
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {title}
                                    </Typography>
                                    {values.map((dat, index) => {
                                        const valor0 = dat.valor[0]?.value || 0;
                                        const valor1 = dat.valor[1]?.value || 0;
                                        const total = valor0 + valor1;
                                        const porcentaje = generacionTotal
                                            ? parseInt((total / generacionTotal) * 100)
                                            : 0;
                                        return (
                                            <React.Fragment key={index}>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{ mb: 1 }}
                                                >
                                                    {dat.tipo}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        p: 2,
                                                        mb: 2,
                                                        borderRadius: 1,
                                                        bgcolor: dat.tipo.includes("Generación renovable")
                                                            ? "success.light"
                                                            : dat.tipo.includes("Generación no")
                                                                ? "error.dark"
                                                                : dat.tipo.includes("Demanda en b.c")
                                                                    ? "info.dark"
                                                                    : "rgba(156, 155, 155, 0.18)",
                                                    }}
                                                >
                                                    <Box>{iconMap[dat.tipo]}</Box>
                                                    <Box>{porcentaje} %</Box>
                                                    <Box>{parseInt(total / 1000).toLocaleString()}</Box>
                                                </Box>
                                            </React.Fragment>
                                        );
                                    })}
                                    {title === "Demanda" && (
                                        <Box
                                            sx={{
                                                py: 2,
                                                px: 1,
                                                borderRadius: 1,
                                                bgcolor: "warning.dark",
                                            }}
                                        >
                                            <Grid container spacing={1} p={1}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}>
                                                <Grid sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: 1
                                                }}>
                                                    <Typography>{iconMap["Generación"]}</Typography>
                                                    <Typography>Generación Total</Typography>
                                                </Grid>
                                                <Grid >
                                                    <Box>{generacionTotal.toLocaleString()}</Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                                </Grid>)
                            ))
                        } sx={{ minHeight: "410" }} />
                    </Stack>
                </Grid>
                {/* Balance Notes */}
                <Grid sx={{ gridArea: "grid3", }}
                    paddingTop={"30px"}  >
                    <CardFeature title="Notas de Balance eléctrico" description="Descripción Notas de Balance"
                        sx={{ overflow: "hidden", maxWidth: { xs: "auto", lg: 500 }, maxHeight: { xs: "auto", lg: 600 } }}
                        cardContent={
                            <Box
                                sx={{
                                    maxHeight: { xs: "auto", lg: 500 },
                                    overflowY: "auto",
                                    pb: 3,

                                    // Personalización del scroll
                                    "&::-webkit-scrollbar": {
                                        width: "2px",// Ancho de la barra
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        backgroundColor: "#f1f1f1", // Color del fondo de la barra
                                        height: "50%"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "limegreen", // Color del "pulgar"
                                        borderRadius: "14px", // Redondeo
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "darkgray", // Color al pasar el mouse
                                        width: "10px",

                                    },
                                }}
                            >
                                <BalanceNotes />
                            </Box>
                        } />
                </Grid>
            </Grid >
        </>

    );

}
