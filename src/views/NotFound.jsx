import React from 'react';

import { Link } from 'react-router-dom';

// Material components
import { Box, CardMedia, Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '60%',
        margin: 'auto',
        paddingBottom: '4%'
    },
    link: {
        color: '#1875D1',
        textDecoration: 'underline'
    }
}))

function NotFound() {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Box>
                <CardMedia
                    component="img"
                    image="/assets/notfound.svg"
                    title="erreur 404"
                    className={classes.img}
                />
                <Typography variant="h3" component="h2" align='center'>
                    La page que vous recherchez semble introuvable.
                </Typography>

                <Typography>
                    <Link to="/" className={classes.link}>Revenir à la page d'accueil</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default NotFound;