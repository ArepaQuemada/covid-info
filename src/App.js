import React from 'react';
import useFetch from './hooks/useFetch';
import useParseDate from './hooks/useParseDate';
import { Line } from 'react-chartjs-2';
import dateFormat from 'dateformat';

function App() {
   const { today, lastWeek } = useParseDate();
   const data = useFetch(`https://api.covid19api.com/country/south-africa?from=${lastWeek}&to=${today}`) || [];
   console.log(data);

   const dataSet = {
      labels: data.map(elem => dateFormat(elem.Date, "d, mmm")),
      datasets: [
         {
            label: 'Confirmed Cases',
            data: data.map(elem => elem.Confirmed),
            backgroundColor: 'rgb(255,255,255,0.1)',
         },
         {
            label: 'Recovered',
            data: data.map(elem => elem.Recovered),
            backgroundColor: 'rgb(255,255,255,0.1)',
         }
      ]
   }

   console.log(dataSet)

  return (
    <div className="App">
       <Line data={dataSet}/>
    </div>
  );
}
