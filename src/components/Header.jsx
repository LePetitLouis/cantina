import React from 'react';

// Material components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5">
                    <Link to='/' style={{ color: 'white' }}>Cantina</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;