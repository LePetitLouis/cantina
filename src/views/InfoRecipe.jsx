import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import restfullProvider from '../services/restfullProvider.js';

// Component
import Alert from '../components/Alert.jsx';

//Material components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Icon
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import ReportIcon from '@material-ui/icons/Report';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function InfoRecipe() {
    const {id} = useParams()

    const [recipe, setRecipe] = useState()
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        restfullProvider.getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(() => setIsError(true))
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

                <Box display="flex" justifyContent="center" mb={4} mt={4}>
                    <Box display="flex" mr={4}>
                        <TimerIcon fontSize="large" color="secondary" />
                        <Typography variant="h6" component="h2" style={{ marginLeft: '10px' }}>
                            {recipe.tempsPreparation} min
                        </Typography>
                    </Box>
                    <FiberManualRecordIcon fontSize="small" style={{ alignSelf: 'center' }} />
                    <Box display="flex" ml={4} mr={4}>
                        <ReportIcon fontSize="large" color="secondary" />
                        <Typography variant="h6" component="h2" style={{ marginLeft: '10px' }}>
                            {recipe.niveau}
                        </Typography>
                    </Box>
                    <FiberManualRecordIcon fontSize="small" style={{ alignSelf: 'center' }} />
                    <Box display="flex" ml={4}>
                        <GroupIcon fontSize="large" color="secondary" />
                        <Typography variant="h6" component="h2" style={{ marginLeft: '10px' }}>
                            {recipe.personnes} {recipe.personnes === 1 ? 'personne' : 'personnes'}
                        </Typography>
                    </Box>
                </Box>

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
            {isError && <Alert message="Problème de connection" severity="error" />}
        </Container>
    );
}

export default InfoRecipe;