import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import restfullProvider from '../services/restfullProvider.js';

//Material components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Icon
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import ReportIcon from '@material-ui/icons/Report';

function InfoRecipe() {
    const {id} = useParams()

    const [recipe, setRecipe] = useState()

    useEffect(() => {
        restfullProvider.getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container style={{ marginTop: '2%' }}>
            {recipe && 
            <>
                <Typography variant="h3" component="h2" align="center" lineHeight={10}>
                    {recipe.titre}
                </Typography>

                <Typography variant="h5" component="h2" align="center" lineHeight={10}>
                    {recipe.description}
                </Typography>

                <img src={recipe.photo} alt={recipe.titre} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <TimerIcon fontSize="large" />
                                <Typography variant="h6" component="h2">
                                    {recipe.tempsPreparation} min
                                </Typography>
                            </Grid>
                            •
                            <Grid item>
                                <ReportIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h2">
                                    {recipe.niveau}
                                </Typography>
                            </Grid>
                            •
                            <Grid item>
                                <GroupIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h2">
                                    {recipe.personnes} {recipe.personnes === 1 ? 'personne' : 'personnes'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h4" component="h2" align="center" color="secondary">
                    Ingrédients
                </Typography>
                <Grid container>
                    {recipe.ingredients.map(ingredient => (
                        <Grid item xs={12} sm={6}>
                            <Box mt={2}>
                                <Typography variant="h6" component="h2">
                                    {ingredient[0]} {ingredient[1]}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" component="h2" align="center" color="secondary">
                    Préparation
                </Typography>
                {recipe.etapes.map((etape, index) => (
                    <Box mt={2}>
                        <Typography variant="h6" component="h2">
                            Étape {index+1}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {etape}
                        </Typography>
                    </Box>
                ))}

            </>
            }
        </Container>
    );
}

export default InfoRecipe;