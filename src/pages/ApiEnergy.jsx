import React, { useState } from 'react'
import { Box, Grid, } from '@mui/material';
import CardFeature from '../components/ApiEnergy/CardFeature';
import Balance from '../components/ApiEnergy/Tabs/Balance'
import Demanda from '../components/ApiEnergy/Tabs/Demanda/Demanda'
import { Generacion } from '../components/ApiEnergy/Tabs/Generacion'
import Intercambios from '../components/ApiEnergy/Tabs/Intercambios'
import Transporte from '../components/ApiEnergy/Tabs/Transporte'
import Mercados from '../components/ApiEnergy/Tabs/Mercados'
import MiniDrawer from '../components/MiniDrawerLeft';

export const ApiEnergy = () => {
    const [showTab, setshowTab] = useState("Demanda");

    return (
        <>
            <MiniDrawer showTab={showTab} setshowTab={setshowTab} />
            <Box sx={{
                margin: "auto", padding: {
                    xs: "90px 0 0 0",
                    sm: "2% 2% 4% 7.5%",
                },
            }} >
                {showTab === "Balance" ? <Balance /> :
                    showTab === "Demanda" ? <Demanda /> :
                        showTab === "Generación" ? <Generacion /> :
                            showTab === "Intercambios" ? <Intercambios /> :
                                showTab === "Transporte" ? <Transporte /> :
                                    showTab === "Mercados" ? <Mercados /> :
                                        <p style={{ color: "red" }}>Ha habido algun error</p>}
            </Box>

        </>
    )
}
export default ApiEnergy;