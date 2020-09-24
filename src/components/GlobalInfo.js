import React from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';
import BuildCards from './BuildCards';

const useStyles = makeStyles(theme => ({
    small: {
        fontStyle: 'italic',
    },
    cardTitles: {
        fontWeight: 600,
        lineHeight: 3
    }
}))

export default function GlobalInfo({ global, theme }) {
    const classes = useStyles();
    const { Global, Date, Countries } = global || {};
    const hasProperties = [Global, Date, Countries].every(elem => elem !== undefined);

    if (hasProperties) {
        const totalTitles = ["Total Confirmed", "Total Deaths", "Total Recovered"];
        const newTitles = ["New Confirmed ", " New Deaths ", "New Recoverd"];
        const { TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered } = Global;

        return (
            <Container maxWidth="md">
                <Box mt={4}>
                    <Typography variant="h5">Global data</Typography>
                    <Typography variant="body1">
                        Date
                        <Typography variant="caption" className={classes.small}>
                            : {Date}
                        </Typography>
                    </Typography>
                    <Typography variant="body1">
                        Countries 
                        <Typography variant="caption" className={classes.small}>
                            : {Countries.length}
                        </Typography>
                    </Typography>
                    <Box textAlign="center" width="100%">
                        <Typography variant="h6" className={classes.cardTitles}>Totals</Typography>
                        <BuildCards
                            titles={totalTitles}
                            stats={[TotalConfirmed, TotalDeaths, TotalRecovered]}
                            theme={theme} />
                        <Typography variant="h6" className={classes.cardTitles}>News</Typography>
                        <BuildCards
                            titles={newTitles}
                            stats={[NewConfirmed, NewDeaths, NewRecovered]}
                            theme={theme} />
                    </Box>
                </Box>
            </Container>
        )
    }
    return (
        <>
        </>
    )
}