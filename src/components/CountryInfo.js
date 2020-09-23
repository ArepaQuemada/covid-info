import React, { useState, useEffect } from 'react';
import { Container, Box } from '@material-ui/core';
import Form from './Form';
import CountryInfoApi from './CountryInfoApi';
import BuildCards from './BuildCards';
import { getTotals, getNews, getPercentTotals } from '../utils/extractData';
import MainDoughnutBuild from './MainDoughnutBuild';
import MainBarBuild from './MainBarBuild';

const buildGlobalElement = (titles, stats, theme, totals, percent, themes) => {
    const datasetTotalDoughnut = [
        {
            data: totals,
            backgroundColor: themes
        },
    ]

    const datasetPercentDoughnut = [
        {
            data: percent,
            backgroundColor: themes,
            label: 'Percents'
        },
    ]

    const optionsTotal = {
        title: {
            display: true,
            text: 'Totals',
            fontSize: 18
        }
    }

    const optionsPercent = {
        title: {
            display: true,
            text: 'Percent of Total',
            fontSize: 18
        }
    }
    return (
        <Box>
            <BuildCards
                titles={titles.map(elem => ' New ' + elem)}
                stats={stats}
                theme={theme}
            />
            <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-evenly">
                <MainDoughnutBuild
                    labels={titles}
                    datasets={datasetTotalDoughnut}
                    options={optionsTotal}
                />
                <MainBarBuild
                    labels={titles}
                    datasets={datasetPercentDoughnut}
                    title="Percent"
                    options={optionsPercent}
                />
            </Box>
        </Box>
    );
}

export default function CountryInfo({ theme, global }) {
    const [countryName, setCountryName] = useState(window.localStorage.getItem('countryName') || '');
    const titles = ["Confirmed", "Deaths", "Recovered"];
    let globalElement = <div></div>
    let countryInfoApiElement = <div></div>

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
        countryInfoApiElement = <CountryInfoApi
            countryName={countryName}
            theme={theme}
            globalElement={globalElement} />
    };
    return (
        <Container maxWidth="md">
            <Form
                setCountryName={setCountryName} />
            { countryInfoApiElement}
        </Container>
    );
}