import React, { useState } from 'react';
import ChartsBuild from './ChartsBuild';
import useFetch from '../hooks/useFetch';
import parseDate from '../utils/parseDate';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    backdrop: {
       zIndex: theme.zIndex.drawer + 1,
       color: theme.palette.primary.main,
    },
 }));

 
export default function ChartsApi ({ theme, countryName }) {
    const classes = useStyles();
    const { today, fromDate } = parseDate();
    const [ loading, setLoading ] = useState();
    const data = {
        monthly: useFetch(`https://api.covid19api.com/total/country/${countryName}/status/confirmed?from=${fromDate}&to=${today}`, setLoading),
        global: useFetch('https://api.covid19api.com/summary', setLoading),
    }
    console.log(data)
    if (loading) {
        return (
           <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress></CircularProgress>
           </Backdrop>
        );
     }
     return (
        <ChartsBuild 
            theme={theme}
            data={data}
            countryName={countryName}
            />
     )
}