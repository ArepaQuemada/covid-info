import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CountryInfo from './components/CountryInfo';
import CompareCountry from './components/CompareCountry';
import GloblInfo from './components/GlobalInfo';

export default function App({ theme }) {

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
                  <CountryInfo theme={theme} />
               </Route>
            </Switch>
         </Router>
      </Container>
   );
}
