import React from 'react';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Recipe({id, titre, description, niveau, personnes, tempsPreparation, photo}) {

    return (
        <Card spacing={2}>
            <Link to={{ pathname: '/recipe/'+ id }}>

                <CardMedia
                    component="img"
                    image={photo}
                    title={titre}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {titre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button variant="outlined" size="small" color="primary">
                        Modifier
                    </Button>
                    <Button variant="outlined" size="small" color="danger">
                        Supprimer
                    </Button>
                </CardActions>

            </Link>
        </Card>
    );
}

export default Recipe;