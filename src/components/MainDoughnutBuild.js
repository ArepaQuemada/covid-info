import React from 'react';
import buildDataSet from '../utils/buildDataSet';
import MainDoughnut from './MainDoughnut';

export default function MainDoughnutBuild({ labels, datasets, options }) {

    const datasetMainDoughnut = buildDataSet(labels, datasets);
    
    return (
        <MainDoughnut 
            dataset={datasetMainDoughnut}
            options={options}
        />
    )
}