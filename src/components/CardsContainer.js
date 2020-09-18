import React from 'react';
import { Box } from '@material-ui/core';
import StatCard from './StatCard';

export default function CardsContainer({ theme, slots }) {

    if (slots) {
        const
            {
                firstSlot: {
                    firstTitle,
                    firstStat
                } = {}
                , secondSlot: {
                    secondTitle,
                    secondStat
                } = {},
                thirdSlot: {
                    thirdTitle,
                    thirdStat
                } = {}
            } = slots || {};

        return (
            <Box display="flex" justifyContent="space-between" width="100%" flexWrap="wrap">
                <StatCard
                    title={firstTitle}
                    stats={firstStat}
                    color={theme.palette.primary.main}
                />
                <StatCard
                    title={secondTitle}
                    stats={secondStat}
                    color={theme.palette.secondary.main}
                />
                <StatCard
                    title={thirdTitle}
                    stats={thirdStat}
                    color={theme.palette.success.main}
                />
            </Box>
        );
    }
    return (
        <>
        </>
    );
}