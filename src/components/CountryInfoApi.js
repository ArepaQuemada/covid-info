import React, { useState } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import useFetch from '../hooks/useFetch';
import parseDate from '../utils/parseDate';
import BackdropLoader from './BackdropLoader';
import MainChartBuild from './MainChartBuild';
import dateFormat from 'dateformat';

const getLabelsAndDataset = (status, theme, countryData) => {
   let color;
   switch (status) {
      case 'deaths': {
         color = theme.palette.secondary.main;
         break
      }
      case 'recovered': {
         color = theme.palette.success.main;
         break;
      }
      default: {
         color = theme.palette.primary.main;
      }
   }
   return buildData(status, countryData, color)
}

const buildData = (label, status, color) => {
   const labels = status.map(elem => dateFormat(elem.Date, 'd, mmm'));
   const datasets = [
      {
         label: label,
         data: status.map(elem => elem.Cases),
         backgroundColor: 'rgb(255,255,255,0.1)',
         borderColor: color,
      }
   ];
   return { labels, datasets };
}

export default function CountryInfoApi({ theme, countryName, globalElement }) {
   const { today, fromDate } = parseDate();
   const [loading, setLoading] = useState();
   const [status, setStatus] = useState('confirmed');

   const countryData = useFetch(`https://api.covid19api.com/total/country/${countryName}/status/${status}?from=${fromDate}&to=${today}`, setLoading);

   const handleClickStatus = (e) => {
      setStatus(e.target.innerText.toLowerCase());
   }

   if (loading) {
      return (
         <BackdropLoader loading={loading} />
      );
   }

   if (countryData) {
      const { labels, datasets } = getLabelsAndDataset(status, theme, countryData);

      return (
         <Box width="100%">
            <Box display="flex" justifyContent="center">
               <Breadcrumbs>
                  <Link onClick={handleClickStatus}>
                     <Typography variant="body1" key="Confirmed">Confirmed</Typography>
                  </Link>
                  <Link onClick={handleClickStatus}>
                     <Typography variant="body1" key="Recovered">Recovered</Typography>
                  </Link>
                  <Link onClick={handleClickStatus}>
                     <Typography variant="body1" key="Deaths">Deaths</Typography>
                  </Link>
               </Breadcrumbs>
            </Box>
            <MainChartBuild
               labels={labels}
               datasets={datasets}
            />
            {globalElement}
         </Box>
      );
   }
   return (
      <>
      </>
   );
}