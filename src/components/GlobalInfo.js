import React from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';
import BuildCards from './BuildCards';

const useStyles = makeStyles(theme => ({
    date: {
        fontStyle: 'italic',
    }
}))

export default function GlobalInfo({ global, theme }) {
    const classes = useStyles();
    const { Global, Date, Countries } = global || {};
    const hasProperties = [Global, Date, Countries].every(elem => elem !== undefined);

    if (hasProperties) {
        const titles = ["Total Confirmed", "Total Deaths", "Total Recovered"];
        const { TotalConfirmed, TotalDeaths, TotalRecovered } = Global;

        return (
            <Container maxWidth="md">
                <Box mt={4}>
                    <Typography variant="h5">Global data</Typography>
                    <Typography variant="body1">
                        Date:
                        <Typography variant="caption" className={classes.date}>
                            {Date}
                        </Typography>
                    </Typography>
                    <BuildCards
                        titles={titles}
                        stats={[TotalConfirmed, TotalDeaths, TotalRecovered]}
                        theme={theme}
                    />

                </Box>
            </Container>
        )
    }
    return (
        <>
        </>
    )
}