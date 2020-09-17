import React from 'react';
import { Line } from 'react-chartjs-2';

export default function App() {

   const dataChart = {
      labels: ['First Label', 'Second Label', 'Third Label', 'Fourth Label'],
      datasets: [
         {
            label: 'First data set',
            data: [1, 5, 6, 99],
            borderColor: 'blue',
            backgroundColor: 'rgb(255, 255, 255, 0.1)'
         },
         {
            label: 'Second data set',
            data: [2, 7, 88, 1],
            borderColor: 'red',
            backgroundColor: 'rgb(255, 255, 255, 0.1)'
         }
      ]
   };

   return (
      <div className="App">
         <Line data={dataChart}></Line>
      </div>
   );
}