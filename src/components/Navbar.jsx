import React, { useEffect, useState } from 'react';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                News
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;