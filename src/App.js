import React from 'react';
import useFetch from './hooks/useFetch';
import useParseDate from './hooks/useParseDate';
import dateFormat from 'dateformat';
import { makeStyles, Container, Backdrop, CircularProgress, Box } from '@material-ui/core';
import MainChart from './components/MainChart';
import CardContainer from './components/CardsContainer';
import MainDoughnut from './components/MainDoughnut';
import buildDataSet from './utils/buildDataSet';

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

const parseSlots = (firstTitle, secondTitle, thirdTitle, firstStat, secondStat, thirdStat, theme) => {
   return [
      {
         title: firstTitle,
         stats: firstStat,
         backgroundColor: theme.palette.primary.main
      },
      {
         title: secondTitle,
         stats: secondStat,
         backgroundColor: theme.palette.secondary.main
      },
      {
         title: thirdTitle,
         stats: thirdStat,
         backgroundColor: theme.palette.success.main
      }
   ]
}

const extractTotals = (data) => {
   const { TotalConfirmed, TotalDeaths, TotalRecovered } = data || {};
   return [ TotalConfirmed, TotalDeaths, TotalRecovered ];
}

const extractNews = (data) => {
   const { NewConfirmed, NewDeaths, NewRecovered } = data || {};
   return [ NewConfirmed, NewDeaths, NewRecovered ];
}

export default function App({ theme }) {
   const classes = useStyles();
   const { today, fromDate } = useParseDate();

   const data = useFetch(`https://api.covid19api.com/country/argentina?from=${fromDate}&to=${today}`);
   const global = useFetch('https://api.covid19api.com/summary');
   
   const countryData = ((global || {}).Countries || []).find(elem => elem.Country === 'Argentina') || {};
   const newCountryData = extractNews(countryData);
   const totalCountryData = extractTotals(countryData);
   const totalGlobalData = extractTotals((global || {}).Global);
   const titles = [ 'Confirmed', 'Deaths', 'Recovered' ];

   let dataSetMainChart = {};
   let newDataCountrySlots = [];
   let datasetMainDoughnutCountry = {};
   let datasetMainDoughnutGlobal = {};

   if (data) {
      const labels = data.map(elem => dateFormat(elem.Date, "d, mmm"));
      const datasets = [
         {
            label: 'Confirmed',
            data: data.map(elem => elem.Confirmed),
            backgroundColor: 'rgb(255,255,255,0.1)',
            borderColor: theme.palette.primary.main,
         },
      ]
      dataSetMainChart = buildDataSet(labels, datasets);
   }

   if (global) {
      newDataCountrySlots = parseSlots('New Confirmed', 'New Deaths', 'New Recovered', ...newCountryData, theme);
      const labelsCountry = [...titles];
      const datasetsCountry = [
         {
            data: [...totalCountryData],
            backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
         },
      ]
      datasetMainDoughnutCountry = buildDataSet(labelsCountry, datasetsCountry);

      const labelsGlobal = [...titles];
      const datasetsGlobal = [ 
         {
            data: [...totalGlobalData],
            backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main]
         }   
      ]
      datasetMainDoughnutGlobal = buildDataSet(labelsGlobal, datasetsGlobal);
   }

   if (!(data || global)) {
      return (
         <Backdrop className={classes.backdrop} open={!(data || global)}>
            <CircularProgress></CircularProgress>
         </Backdrop>
      );
   }

   return (
      <Container className={classes.root}>
         <MainChart
            dataset={dataSetMainChart}
         />
         <CardContainer
            theme={theme}
            slots={newDataCountrySlots}
         />
         <Box width="100%" display="flex" flexWrap="wrap" alignItems="space-between">
            <MainDoughnut
               color={theme.palette.primary.main}
               dataset={datasetMainDoughnutCountry}
               title="Total by country"
            />
            <MainDoughnut
               color={theme.palette.primary.main}
               dataset={datasetMainDoughnutGlobal}
               title="Total globally"
            />
         </Box>
      </Container>
   );
}
