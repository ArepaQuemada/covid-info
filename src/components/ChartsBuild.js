import React, { useRef } from 'react';
import ChartsContainer from './ChartsContainer';
import buildDataSet from '../utils/buildDataSet';
import dateFormat from 'dateformat';

const parseSlots = (firstTitle, secondTitle, thirdTitle, firstStat, secondStat, thirdStat, theme) => {
    return [
        {
            title: firstTitle,
            stats: firstStat,
            backgroundColor: theme.palette.primary.main
        },
        {
            title: secondTitle,
            stats: secondStat,
            backgroundColor: theme.palette.secondary.main
        },
        {
            title: thirdTitle,
            stats: thirdStat,
            backgroundColor: theme.palette.success.main
        }
    ]
}

const extractTotals = (data) => {
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = data || {};
    return [TotalConfirmed, TotalDeaths, TotalRecovered];
}

const extractNews = (data) => {
    const { NewConfirmed, NewDeaths, NewRecovered } = data || {};
    return [NewConfirmed, NewDeaths, NewRecovered];
}

const buildDataSetMonthly = (data, theme) => {

    const labels = data.map(elem => dateFormat(elem.Date, "d, mmm"));
    const datasets = [
        {
            label: 'Confirmed',
            data: data.map(elem => elem.Confirmed),
            backgroundColor: 'rgb(255,255,255,0.1)',
            borderColor: theme.palette.secondary.main,
        },
    ]
    return buildDataSet(labels, datasets);
}


const getTotals = (countryData, data) => {
    const { Global } = data;
    return {
        totalCountryData: extractTotals(countryData),
        totalGlobalData: extractTotals(Global)
    }
}

const buildDataSetGlobal = (data, theme, countryName) => {
    const countryData = ((data || {}).Countries || []).find(elem => elem.Country.search(countryName)) || {};
    const newCountryData = extractNews(countryData);
    const { totalCountryData, totalGlobalData } = getTotals(countryData, data);
    const titles = ['Confirmed', 'Deaths', 'Recovered'];
    const newDataCountrySlots = parseSlots('New Confirmed', 'New Deaths', 'New Recovered', ...newCountryData, theme);

    const labelsCountry = [...titles];
    const datasetsCountry = [
        {
            data: [...totalCountryData],
            backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
        },
    ]

    const labelsGlobal = [...titles];
    const datasetsGlobal = [
        {
            data: [...totalGlobalData],
            backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main]
        }
    ]
    return {
        datasetMainDoughnutCountry: buildDataSet(labelsCountry, datasetsCountry),
        datasetMainDoughnutGlobal: buildDataSet(labelsGlobal, datasetsGlobal),
        newDataCountrySlots
    }
}

export default function ChartsBuild({ theme, data, countryName }) {
    const { monthly, global } = data;
    const chartsRef = useRef();
    console.log(global);

    if (monthly && global) {
        const dataSetMainChart = buildDataSetMonthly(monthly, theme);
        const dataSetsDoughnut = buildDataSetGlobal(global, theme, countryName);
        const { newDataCountrySlots } = dataSetsDoughnut;
        
        return (
            <div ref={chartsRef}>
                <ChartsContainer
                    dataSetMainChart={dataSetMainChart}
                    dataSetsDoughnut={dataSetsDoughnut}
                    newDataCountrySlots={newDataCountrySlots}
                    theme={theme}
                    chartsRef={chartsRef.current}
                />
            </div>
        );
    }
    return (
        <>
        </>
    );
}