import React from 'react';
import buildDataSet from '../utils/buildDataSet';
import MainChart from './MainChart';

export default function MainChartBuild({labels, datasets }) {

    let datasetMainChart = buildDataSet(labels, datasets);

    return (
        <MainChart dataset={datasetMainChart}/>
    );
}
