import React, { useState, useRef } from 'react';
import { Container } from '@material-ui/core';
import Form from './components/Form';
import ChartsApi from './components/ChartsApi';

export default function App({ theme }) {
   const [ countryName, setCountryName ] = useState();
   const mainChartRef = useRef(null);

   return (
      <Container>
         <Form
            mainChartRef={mainChartRef}
            setCountryName={setCountryName}
           />
           { countryName ? 
            <ChartsApi 
               theme={theme}
               countryName={countryName}
               /> : <> </>}
      </Container>
   );
}
