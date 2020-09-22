export const getTotals = (countryData) => {
    if (countryData && countryData.length > 0) {
        const [{ TotalConfirmed, TotalDeaths, TotalRecovered }] = countryData || {};
        return [TotalConfirmed, TotalDeaths, TotalRecovered];
    }
    return null;
}

export const getNews = (countryData) => {
    if (countryData && countryData.length > 0) {
        const [{ NewConfirmed, NewDeaths, NewRecovered }] = countryData;
        return [NewConfirmed, NewDeaths, NewRecovered];
    }
    return null
}