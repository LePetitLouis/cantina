import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// Material components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icon
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

function Recipe({id, titre, description, niveau, personnes, tempsPreparation, photo}) {

    const [open, setOpen] = useState(false)

    // Open modal delete recipe
    const handleClickOpen = () => {
        setOpen(true);
    }

    // Close modal
    const handleClose = () => {
        setOpen(false);
    };

    // Delete recipe
    const handleDelete = (id) => {
        setOpen(false);
    }

    return (
        <>
        <Card spacing={2}>
            <Link to={{ pathname: '/recipe/'+ id }}>

                <CardMedia
                    component="img"
                    image={photo}
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

                <CardActions>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="small" 
                        startIcon={<CreateIcon />}
                    >
                        Modifier
                    </Button>
                    <Button 
                        variant="contained"
                        color="secondary"
                        size="small" 
                        startIcon={<DeleteIcon />}
                        onClick={handleClickOpen}
                    >
                        Supprimer
                    </Button>
                </CardActions>

            </Link>
        </Card>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">Voullez-vous vraiment supprimer cette recette ?</DialogTitle>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Fermer
        </Button>
        <Button onClick={handleDelete} color="primary">
            Supprimer
        </Button>
        </DialogActions>
        </Dialog>
        </>
    );
}

export default Recipe;