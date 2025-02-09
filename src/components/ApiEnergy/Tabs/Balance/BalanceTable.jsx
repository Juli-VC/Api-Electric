import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
// iconos
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
import CardFeature from "../../CardFeature";
import { BalanceNotes } from "./BalanceNotes";
import { useTheme } from '../../../../theme/ThemeProvider';

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


const BalanceTable = ({ startDate, endDate, dataByTitle }) => {
    const { theme } = useTheme();
    return (
        <Grid container spacing={{ xs: 2, lg: 2 }} sx={{ justifyContent: { xs: "center", lg: "space-evenly" } }}>
            {/* Table  */}
            <Grid size={{ xs: 11, sm: 8, lg: "auto" }} sx={{ justifyContent: "center" }} >
                <CardFeature sx={{ maxWidth: { xs: "auto", lg: 400 } }} cardContent={
                    <TableContainer sx={{ color: theme.colors.text }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {startDate && endDate && (
                                        <TableCell align="right" style={{ color: theme.colors.text, backgroundColor: "transparent" }}>
                                            {startDate} - {endDate}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataByTitle && Object.entries(dataByTitle)?.map(([title, values], index) => (
                                    <React.Fragment key={index}>
                                        <TableRow >
                                            <TableCell style={{ color: theme.colors.primary, fontSize: "18px", fontWeight: 800 }}>{title}</TableCell>
                                        </TableRow>
                                        {values?.map((dat, index) => (
                                            <TableRow key={index}>
                                                <TableCell style={{ color: theme.colors.text }}>{dat.tipo}</TableCell>
                                                <TableCell align="right" style={{ color: theme.colors.text }}>
                                                    {dat.valor[0]?.value ? parseInt(dat.valor[0].value / 1000).toLocaleString() : '0'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }>
                </CardFeature>
            </Grid>
            {/* Balance Notes */}
            <Grid size={{ xs: 11, lg: "auto" }} sx={{ justifyContent: "center" }} paddingTop={"30px"}  >
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
                                    backgroundColor: theme.colors.primary, // Color del "pulgar"
                                    borderRadius: "14px", // Redondeo
                                },
                                "&::-webkit-scrollbar-thumb:hover": {
                                    backgroundColor: theme.colors.secondary, // Color al pasar el mouse
                                    width: "10px",

                                },
                            }}
                        >
                            <BalanceNotes />
                        </Box>
                    } />
            </Grid>
        </Grid>
    );
};

export default BalanceTable;
