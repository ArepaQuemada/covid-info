import React, { useRef } from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import MainChart from './MainChart';
import CardContainer from './CardsContainer';
import MainDoughnut from './MainDoughnut';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            padding: '10px'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
    },
}));

export default function ChartsContainer({ theme, dataSetMainChart, dataSetsDoughnut, newDataCountrySlots }) {
    const classes = useStyles();
    const mainChartRef = useRef(null);
    const { datasetMainDoughnutCountry, datasetMainDoughnutGlobal } = dataSetsDoughnut;
    
    return (
        <Container className={classes.root}>
            <div ref={mainChartRef}>
                <MainChart
                    dataset={dataSetMainChart}
                    id="main-chart"
                />
            </div>
            <CardContainer
                theme={theme}
                slots={newDataCountrySlots}
            />
            <Box width="100%" display="flex" flexWrap="wrap" alignItems="space-evenly">
                <MainDoughnut
                    color={theme.palette.primary.dark}
                    dataset={datasetMainDoughnutCountry}
                    title="Total by country"
                />
                <MainDoughnut
                    color={theme.palette.primary.dark}
                    dataset={datasetMainDoughnutGlobal}
                    title="Total globally"
                />
            </Box>
        </Container>
    );
}
