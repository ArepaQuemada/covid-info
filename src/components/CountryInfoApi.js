import React, { useState } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import useFetch from '../hooks/useFetch';
import parseDate from '../utils/parseDate';
import BackdropLoader from './BackdropLoader';
import MainChartBuild from './MainChartBuild';
import dateFormat from 'dateformat';

const getLabelsAndDataset2 = (status, statusData) => {
   const { data, color } = statusData.find(elem => elem.status === status);
   return buildData(status, data, color);
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

const isFetched = (statusData) => {
   return statusData.every(elem => elem.data);
}

export default function CountryInfoApi({ theme, countryName, globalElement }) {
   const { today, fromDate } = parseDate();
   const [loading, setLoading] = useState();
   const [status, setStatus] = useState('confirmed');

   const statusData = [
      {
         data: useFetch(`https://api.covid19api.com/total/country/${countryName}/status/confirmed?from=${fromDate}&to=${today}`, setLoading),      
         status: 'confirmed',
         color: theme.palette.primary.main
      },
      {
         data: useFetch(`https://api.covid19api.com/total/country/${countryName}/status/deaths?from=${fromDate}&to=${today}`, setLoading),
         status: 'deaths',
         color: theme.palette.secondary.main
      },
      {
         data: useFetch(`https://api.covid19api.com/total/country/${countryName}/status/recovered?from=${fromDate}&to=${today}`, setLoading),
         status: 'recovered',
         color: theme.palette.success.main
      }
   ];

   const handleClickStatus = (e) => {
      setStatus(e.target.innerText.toLowerCase());
   }

   if (loading) {
      return (
         <BackdropLoader loading={loading} />
      );
   }

   const fetched = isFetched(statusData);

   if (fetched) {
      const { labels, datasets } = getLabelsAndDataset2(status, statusData);

      return (
         <Box width="100%" textAlign="center">
            <Typography variant="h5">{countryName}</Typography>
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