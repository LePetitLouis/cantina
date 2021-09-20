import React from 'react';

import { Link } from 'react-router-dom';

// Material components
import { Box, Container, Typography } from '@material-ui/core';

function NotFound() {

    return (
        <Container>
            <Box>
                <Typography variant="h1" component="h2">
                    Oups !
                </Typography>
                <Typography variant="h3" component="h2">
                    La page que vous recherchez semble introuvable.
                </Typography>

                <Link to="/">Page d'accueil</Link>
            </Box>
        </Container>
    );
}

export default NotFound;