import React from 'react';
import buildDataSet from '../utils/buildDataSet';
import MainDoughnut from './MainDoughnut';

export default function MainDoughnutBuild({ labels, datasets, title }) {

    const datasetMainDoughnut = buildDataSet(labels, datasets);
    
    return (
        <MainDoughnut 
            dataset={datasetMainDoughnut}
            title={title}
        />
    )
}