import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

export default function StatCard({ title, stats, color }) {

    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: color,
            padding: '10px',
            width: '31%',
            marginBottom: '10px',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
        }
    }));

    const classes = useStyles();
    
    return (
        <Box className={classes.root} textAlign="center">
            <Typography variant="h4">{stats}</Typography>
            <Typography variant="h6">{title}</Typography>
        </Box>
    );
}