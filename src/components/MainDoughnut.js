import React from 'react';
import { Container } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2'

export default function MainDoughnut({ dataset }) {
    return (
        <Container disableGutters>
            <Doughnut 
                data={dataset} />
        </Container>
    );
}