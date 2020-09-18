import React from 'react';
import useFetch from './hooks/useFetch';
import useParseDate from './hooks/useParseDate';
import dateFormat from 'dateformat';
import { makeStyles, Container, Backdrop, CircularProgress } from '@material-ui/core';
import MainChart from './components/MainChart';
import CardContainer from './components/CardsContainer';

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

const parseSlots = (firstTitle, firstStat, secondTitle, secondStat, thirdTitle, thirdStat) => {
   return {
      firstSlot: {
         firstTitle,
         firstStat
      },
      secondSlot: {
         secondTitle,
         secondStat
      },
      thirdSlot: {
         thirdTitle,
         thirdStat
      }
   }   
}

export default function App({ theme }) {
   const classes = useStyles();
   const { today, fromDate } = useParseDate();
   const data = useFetch(`https://api.covid19api.com/country/argentina?from=${fromDate}&to=${today}`);
   const global = useFetch('https://api.covid19api.com/summary');
   console.log(global);
   const countryData = ((global || {}).Countries || []).find(elem => elem.Country = 'Argentina') || {};
   const { NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered } = countryData;
   let dataSet = {};

   if (data) {
      dataSet = {
         labels: data.map(elem => dateFormat(elem.Date, "d, mmm")),
         datasets: [
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
      }
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
         dataset={dataSet}
         />
      <CardContainer 
         theme={theme}
         slots={parseSlots("New Confirmed", NewConfirmed, "New Deaths", NewDeaths, "New Recovered", NewRecovered)}
         />
   </Container>
  );
}
