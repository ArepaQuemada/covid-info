import React from 'react';
import { Box } from '@material-ui/core';
import StatCard from './StatCard';

export default function CardsContainer({ theme, slots }) {
    if (slots) {
        return (
            <Box display="flex" justifyContent="space-between" width="100%" flexWrap="wrap" mt={2} mb={2}>
                {slots.map(elem => {
                    return (
                        <StatCard 
                            title={elem.title}
                            stats={elem.stats}
                            color={elem.backgroundColor}
                            />
                    )
                })}
            </Box>
        );
    }
    return (
        <>
        </>
    );
}