import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Drawer, Container, Divider, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    drawerContainer: {
        backgroundColor: "#333333",
        height: '100%',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.dark,
        fontWeight: 'bolder'
    }
}));

export default function Header() {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    const menuItems = [
        {
            menuName: 'Country Info',
            route: '/'
        },
        {
            menuName: 'Compare Countries',
            route: '/compare-countries'
        },
        {
            menuName: 'Global Info',
            route: '/global-info'
        }
    ]

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <Container disableGutters>
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    <IconButton onClick={handleOpenMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Covid Info Charts</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openMenu} >
                <Container className={classes.drawerContainer}>
                    <Box display="flex" justifyContent="center" width="100%">
                        <IconButton onClick={handleOpenMenu}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    {menuItems.map((item, index) => {
                        return (
                            <Box m={2} p={1} key={index}>
                                <Link className={classes.link} to={`${item.route}`} onClick={handleOpenMenu}>
                                    <Typography variant="body1">{item.menuName}</Typography>
                                </Link>
                                <Divider />
                            </Box>
                        )
                    })}
                </Container>
            </Drawer>
        </Container>
    )
}