import React from 'react';

// Material components
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

function Navbar() {
    return (
        <AppBar position="sticky" color="default" >
            <Typography variant="span" align="center">
                Réaliser et Développer avec ♥️ par Louis Poupat
            </Typography>
        </AppBar>
    );
}

export default Navbar;