import React from 'react';
import CardsCointainer from './CardsContainer';

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

export default function BuildCards({ titles, stats, theme }) {
    const slots = parseSlots(...titles, ...stats, theme);
    return (
        <>
            <CardsCointainer slots={slots}/>
        </>
    )
}