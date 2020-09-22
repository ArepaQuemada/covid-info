export const getTotals = (countryData) => {
    if (countryData) {
        const { TotalConfirmed, TotalDeaths, TotalRecovered } = countryData || {};
        return [TotalConfirmed, TotalDeaths, TotalRecovered];
    }
    return null;
}

export const getNews = (countryData) => {
    if (countryData) {
        const { NewConfirmed, NewDeaths, NewRecovered } = countryData;
        return [NewConfirmed, NewDeaths, NewRecovered];
    }
    return null
}

export const getPercentTotals = (totals) => {
    if (totals) {
        const total = totals.reduce((acum, elem) => acum + elem);
        return totals.map(elem => Math.round(elem / total * 100));
    }
}