import React from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles, Container, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '10px'
    },
    wrapper: {
        border: `3px solid ${theme.palette.primary.dark}`,
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    }
}));

export default function MainChart({ dataset }) {
    const classes = useStyles();

    return (
        <Container className={classes.root} disableGutters maxWidth="md">
            <Box className={classes.wrapper}>
                <Line
                    data={dataset}
                />
            </Box>
        </Container>
    );
}