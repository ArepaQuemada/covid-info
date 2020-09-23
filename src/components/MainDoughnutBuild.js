import React from 'react';
import buildDataSet from '../utils/buildDataSet';
import MainDoughnut from './MainDoughnut';

export default function MainDoughnutBuild({ labels, datasets, title, options }) {

    const datasetMainDoughnut = buildDataSet(labels, datasets);
    console.log(options)
    return (
        <MainDoughnut 
            dataset={datasetMainDoughnut}
            options={options}
        />
    )
}