import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// Material components
import {Card, CardMedia, CardContent, CardActions, Button, Typography, Dialog, DialogActions, DialogTitle} from '@material-ui/core';

// Material icon
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

function Recipe({id, titre, description, photo, onListRecipes}) {

    const [open, setOpen] = useState(false)

    // Delete recipe
    const handleDelete = (id) => {
        onListRecipes(id)
        setOpen(false)
    }

    return (
        <>
        <Card spacing={2}>
            <Link to={{ pathname: '/recipe/'+ id }}>

                <CardMedia
                    component="img"
                    image={photo ? photo : "https://www.oxygene-numerique.fr/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/v/i/visuel-non-disponible_15.jpg"}
                    title={titre}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                        {titre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions>
                <Link to={{ pathname: '/edit-recipe/'+ id }}>
                <Button 
                    variant="contained" 
                    color="primary"
                    size="small" 
                    startIcon={<CreateIcon />}
                >
                    Modifier
                </Button>
                </Link>
                <Button 
                    variant="contained"
                    color="secondary"
                    size="small" 
                    startIcon={<DeleteIcon />}
                    onClick={() => setOpen(true)}
                >
                    Supprimer
                </Button>
            </CardActions>
            
        </Card>

        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Voullez-vous vraiment supprimer cette recette ?</DialogTitle>
            <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Annuler
            </Button>
            <Button onClick={() => handleDelete(id)} color="primary">
                Supprimer
            </Button>
            </DialogActions>
        </Dialog>

        </>
    );
}

export default Recipe;