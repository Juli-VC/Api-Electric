import { Grid } from '@mui/material'
import React from 'react'
import CardFeature from '../CardFeature'

export default function Demanda() {
    return (
        <Grid container spacing={2}>
            <p>Demanda</p>
            <Grid item xs={6} md={4}>
                <CardFeature />
            </Grid>
            <Grid item xs={6} md={4}>
                <CardFeature />
            </Grid>
            <Grid item xs={6} md={4}>
                <CardFeature />
            </Grid>
            <Grid item xs={6} md={8}>
                <CardFeature />
            </Grid>
        </Grid>
    )
}