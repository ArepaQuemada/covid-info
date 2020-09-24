import React from 'react';
import { Container, Box } from '@material-ui/core';
import BuildCards from './BuildCards';

export default function GlobalInfo({ global, theme }) {
    const { Global } = global || {};
    if (Global) {
        const titles = ["Total Confirmed", "Total Deaths", "Total Recovered"];
        const { TotalConfirmed, TotalDeaths, TotalRecovered } = Global;
        return (
            <Container maxWidth="md">
                <Box mt={4}>
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