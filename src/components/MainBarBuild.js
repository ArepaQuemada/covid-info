import React from 'react';
import buildDataSet from '../utils/buildDataSet';
import MainBar from './MainBar';

export default function MainBarBuild({ labels, datasets, options }) {
    const datasetMainBar = buildDataSet(labels, datasets);
    
    return (
        <MainBar 
            dataset={datasetMainBar}
            options={options}
        />
    )
}