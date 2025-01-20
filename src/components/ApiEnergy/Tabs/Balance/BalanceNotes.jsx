import { Box, Typography, Divider } from "@mui/material";

export const BalanceNotes = () => {
    return (
        <Box sx={{ padding: "16px", backgroundColor: "transparent", }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "whitesmoke" }}>
                Notas
            </Typography>
            <Divider sx={{ marginBottom: "16px", borderColor: "limegreen" }} />
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Balance eléctrico:</strong> asignación de unidades de producción según combustible principal.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Otras renovables:</strong> incluye biogás, biomasa, hidráulica marina y geotérmica.
                Los valores de incrementos y año móvil incluyen residuos hasta el 31/12/2014.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Residuos renovables:</strong> generación incluida en otras renovables y cogeneración hasta el 31/12/2014.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Turbinación:</strong> incluye bombeo puro y estimación de bombeo mixto.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Ciclo combinado:</strong> incluye funcionamiento en ciclo abierto.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Fuel + Gas:</strong> en el sistema eléctrico nacional incluye generación con grupos auxiliares de Baleares.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Cogeneración:</strong> los valores de incrementos y año móvil incluyen residuos hasta el 31/12/2014.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Residuos no renovables:</strong> generación incluida en otras renovables y cogeneración hasta el 31/12/2014.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Demanda corregida:</strong> corregidos los efectos de temperatura y laboralidad.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "whitesmoke", marginBottom: "8px" }}>
                <strong>Saldo de intercambios:</strong> valor positivo indica saldo importador; valor negativo indica saldo exportador.
                Los valores de incrementos no se calculan cuando los saldos tienen distinto signo.
            </Typography>
        </Box>
    );
};
