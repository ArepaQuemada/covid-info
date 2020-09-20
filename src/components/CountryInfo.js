import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Form from './Form';
import ChartsApi from './ChartsApi';

export default function CountryInfo({ theme }) {
    const [countryName, setCountryName] = useState();

    return (
        <Container>
            <Form
                setCountryName={setCountryName}
            />
            { countryName ?
                <ChartsApi
                    countryName={countryName}
                    theme={theme}
                /> : <> </>}
        </Container>
    );    
}