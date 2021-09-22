import React from 'react';

// Material components
import { Box, Divider, Typography } from '@material-ui/core';

function Navbar() {
    return (
        <>
            <Divider orientation="vertical" style={{ width: '80%', margin: 'auto', height: '2px' }} />
            <Box m={2} style={{ textAlign: 'center' }}>
                <Typography variant="span">
                    © 2021 Cantina, Inc. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}

export default Navbar;