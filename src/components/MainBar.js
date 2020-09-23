import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Bar } from 'react-chartjs-2'

const useStyles = makeStyles(theme =>({
    root: {
        marginBottom: '10px',
        border: `3px solid ${theme.palette.primary.main}`,
        textAlign: "center",
        [theme.breakpoints.up('md')]: {
            maxWidth: '49%'
        }
    }
}));

export default function MainBar({ dataset, options }) {
    
    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth="sm" disableGutters>
            <Bar 
                data={dataset}
                options={options} />
        </Container>
    );
}