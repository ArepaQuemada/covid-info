import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Form from './Form';
import CountryInfoApi from './CountryInfoApi';
import BuildCards from './BuildCards';

const getNews = (global, countryName) => {
    if (global && countryName) {
        const countryData = global.Countries.filter(elem => {
            return elem.Country.toLowerCase().indexOf(countryName.toLowerCase()) > -1
        });
        
        if (countryData && countryData.length > 0) {
            const [{ NewConfirmed, NewDeaths, NewRecovered } ] = countryData;
            return [NewConfirmed, NewDeaths, NewRecovered];
        } else {
            return null
        }
    }
}

export default function CountryInfo({ theme, global }) {
    const [countryName, setCountryName] = useState(window.localStorage.getItem('countryName') || '');
    const titles = ["New Confirmed", "New Deaths", "New Recovered"];
    const stats = getNews(global, countryName);

    useEffect(() => {
        window.localStorage.setItem('countryName', countryName);
    }, [ countryName ]);

    return (
        <Container maxWidth="md">
            <Form
                setCountryName={setCountryName}
            />
            { countryName ?
                <CountryInfoApi
                    countryName={countryName}
                    theme={theme}
                /> : <> </>}
            { stats ?  
                <BuildCards 
                    titles={titles}
                    stats={stats}
                    theme={theme}
            /> : <></>}
        </Container>
    );    
}