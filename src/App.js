import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CountryInfo from './components/CountryInfo';
import CompareCountry from './components/CompareCountry';
import GloblInfo from './components/GlobalInfo';
import useFetch from './hooks/useFetch';
import BackdropLoader from './components/BackdropLoader';

export default function App({ theme }) {
   const [ loading, setLoading ] = useState();
   const global = useFetch('https://api.covid19api.com/summary', setLoading); 
   
   if (loading) {
      return (
         <BackdropLoader loading={loading} />
      )
   }

   return (
      <Container disableGutters maxWidth={false}>
         <Router basename="covid-info">
            <Header />
            <Switch>
               <Route path="/compare-countries">
                  <CompareCountry theme={theme} />   
               </Route>
               <Route path="/global-info">
                  <GloblInfo theme={theme} />
               </Route>
               <Route exact-path="/">
                  <CountryInfo theme={theme} global={global} />
               </Route>
            </Switch>
         </Router>
      </Container>
   );
}
