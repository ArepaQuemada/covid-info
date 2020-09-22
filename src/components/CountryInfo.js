import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Form from './Form';
import CountryInfoApi from './CountryInfoApi';
import BuildCards from './BuildCards';
import { getTotals, getNews } from '../utils/extractData';

export default function CountryInfo({ theme, global }) {
    const [countryName, setCountryName] = useState(window.localStorage.getItem('countryName') || '');
    const titles = ["New Confirmed", "New Deaths", "New Recovered"];
    let globalElement = <div></div>

    useEffect(() => {
        window.localStorage.setItem('countryName', countryName);
    }, [countryName]);

    if (global && countryName) {
        const countryData = global.Countries.filter(elem => {
            return elem.Country.toLowerCase().indexOf(countryName.toLowerCase()) > -1
        });
        const stats = getNews(countryData);
        const totals = getTotals(countryData);
        globalElement = <BuildCards
            titles={titles}
            stats={stats}
            theme={theme}
        />
    };
    return (
        <Container maxWidth="md">
            <Form
                setCountryName={setCountryName}
            />
            { countryName ?
                <CountryInfoApi
                    countryName={countryName}
                    theme={theme}
                    globalElement={globalElement}
                /> : <> </>}
        </Container>
    )
}