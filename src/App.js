import React from 'react';
import useFetch from './hooks/useFetch';
import useParseDate from './hooks/useParseDate';
import dateFormat from 'dateformat';
import { makeStyles, Container, Backdrop, CircularProgress } from '@material-ui/core';
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

const parseSlots = (firstTitle, firstStat, secondTitle, secondStat, thirdTitle, thirdStat, theme) => {
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

export default function App({ theme }) {
   const classes = useStyles();
   const { today, fromDate } = useParseDate();
   const data = useFetch(`https://api.covid19api.com/country/argentina?from=${fromDate}&to=${today}`);
   const global = useFetch('https://api.covid19api.com/summary');
   console.log(global);
   const countryData = ((global || {}).Countries || []).find(elem => elem.Country = 'Argentina') || {};
   const { NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered } = countryData;
   let dataSetMainChart = {};
   let newDataCountrySlots = [];
   let dataserMainDoughnut = {};

   if (data) {
      const labels = data.map(elem => dateFormat(elem.Date, "d, mmm"));
      const datasets = [
         {
            label: 'Confirmed',
            data: data.map(elem => elem.Confirmed),
            backgroundColor: 'rgb(255,255,255,0.1)',
            borderColor: theme.palette.alert.main,
         },
         {
            label: 'Recovered',
            data: data.map(elem => elem.Recovered),
            backgroundColor: 'rgb(255,255,255,0.1)',
            borderColor: theme.palette.success.main
         },
         {
            label: 'Deaths',
            data: data.map(elem => elem.Deaths),
            backgroundColor: 'rgb(255,255,255,0.1)',
            borderColor: theme.palette.secondary.main
         }
      ]
      dataSetMainChart = buildDataSet(labels, datasets);
   }

   if (global) {
      newDataCountrySlots = parseSlots('New Confirmed', NewConfirmed, 'New Deaths', NewDeaths, 'New Recovered', NewRecovered, theme);
      const labels = ['Total Confirmed', 'Total Deaths', 'Total Recovered'];
      const datasets = [
         {
            label: 'Confirmed',
            data: [ TotalConfirmed, TotalDeaths, TotalRecovered ],
            backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
         },
      ]
      dataserMainDoughnut = buildDataSet(labels, datasets);
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
         <MainDoughnut
            dataset={dataserMainDoughnut}
            />
      </Container>
   );
}
