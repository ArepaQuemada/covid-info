import React, { useRef } from 'react';
import countries from '../utils/countries.json';
import { TextField, Container, Box, Typography, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles({
    root: {
        textAlign: "center"
    }
});

export default function Form({ setCountryName }) {
    const classes = useStyles();
    const inputRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        const { current: { firstChild: { control: { defaultValue } } } } = inputRef;
        setCountryName(defaultValue);
    }

    return (
        <Container className={classes.root} disableGutters>
            <Typography variant="h4">COVID INFO CHARTS</Typography>
            <Box height="80%" display="flex" flexDirection="column" justifyContent="center">
                <form onSubmit={handleClick}>
                    <Box mb={2}>
                        <Autocomplete
                            options={countries}
                            getOptionLabel={(option) => option.name}
                            fullWidth
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Country name"
                                    placeholder="Type a country name"
                                    variant="outlined"
                                    color="primary"
                                    ref={inputRef}
                                />}
                        />
                    </Box>
                    <Box mb={1}>
                        <Button type="submit" color="primary" variant="contained" fullWidth size="large">SEARCH</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}