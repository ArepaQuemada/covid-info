import React, { useState, useEffect } from 'react';
import { Container, Box } from '@material-ui/core';
import Form from './Form';
import CountryInfoApi from './CountryInfoApi';
import BuildCards from './BuildCards';
import { getTotals, getNews, getPercentTotals } from '../utils/extractData';
import MainDoughnutBuild from './MainDoughnutBuild';

const buildGlobalElement = (titles, stats, theme, totals, percent, themes) => {
    const datasetTotalDoughnut = [
        {
            data: totals,
            backgroundColor: themes
        }
    ]

    const datasetPercentDoughnut = [
        {
            data: percent,
            backgroundColor: themes
        }
    ]
    return (
        <Box>
            <BuildCards
                titles={titles.map(elem => ' New '+elem)}
                stats={stats}
                theme={theme}
            />
            <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-evenly">
                <MainDoughnutBuild
                    labels={titles}
                    datasets={datasetTotalDoughnut}
                    title="Totals"
                />
                <MainDoughnutBuild
                    labels={titles}
                    datasets={datasetPercentDoughnut}
                    title="Percent"
                />
            </Box>
        </Box>
    )
}

export default function CountryInfo({ theme, global }) {
    const [countryName, setCountryName] = useState(window.localStorage.getItem('countryName') || '');
    const titles = ["Confirmed", "Deaths", "Recovered"];
    let globalElement = <div></div>

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            window.localStorage.setItem('countryName', countryName);
        }
        return () => {
            unmounted = true;
        }
    }, [countryName]);

    if (global && countryName) {
        const doughnutThemes = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main];
        const countryData = global.Countries.find(elem => {
            return elem.Country.toLowerCase().indexOf(countryName.toLowerCase()) > -1
        });
        const stats = getNews(countryData);
        const totals = getTotals(countryData);
        const percent = getPercentTotals(totals)
        globalElement = countryData ? buildGlobalElement(titles, stats, theme, totals, percent, doughnutThemes) : <div></div>
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