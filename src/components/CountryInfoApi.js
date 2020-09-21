import React, { useState } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import useFetch from '../hooks/useFetch';
import parseDate from '../utils/parseDate';
import BackdropLoader from './BackdropLoader';
import MainChartBuild from './MainChartBuild';
import dateFormat from 'dateformat';

const getLabelsAndDataset = (status, theme, confirmed, deaths, recovered) => {
   switch (status) {
      case 'confirmed': {
         return buildData(status, confirmed, theme.palette.primary.main);
      }
      case 'deaths': {
         return buildData(status, deaths, theme.palette.secondary.main);
      }
      case 'recovered': {
         return buildData(status, recovered, theme.palette.success.main);
      }
      default: {
         return null
      }
   }
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

export default function CountryInfoApi({ theme, countryName }) {
   const { today, fromDate } = parseDate();
   const [loading, setLoading] = useState();
   const [status, setStatus] = useState('confirmed');

   const confirmed = useFetch(`https://api.covid19api.com/total/country/${countryName}/status/confirmed?from=${fromDate}&to=${today}`, setLoading);
   const deaths = useFetch(`https://api.covid19api.com/total/country/${countryName}/status/deaths?from=${fromDate}&to=${today}`, setLoading);
   const recovered = useFetch(`https://api.covid19api.com/total/country/${countryName}/status/recovered?from=${fromDate}&to=${today}`, setLoading);

   const handleClickStatus = (e) => {
      setStatus(e.target.innerText.toLowerCase());
   }

   if (loading) {
      return (
         <BackdropLoader loading={loading} />
      );
   }

   if (confirmed && deaths && recovered) {
      const { labels, datasets } = getLabelsAndDataset(status, theme, confirmed, deaths, recovered);
      
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
         </Box>
      )
   }
   return (
      <>
      </>
   );
}