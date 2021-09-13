import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import restfullProvider from '../services/restfullProvider.js';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function InfoRecipe() {
    const {id} = useParams()

    const [recipe, setRecipe] = useState()

    useEffect(() => {
        restfullProvider.getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            {recipe && 
            <>
                <Typography variant="h1" component="h2">
                    {recipe.titre}
                </Typography>
                <img src={recipe.photo} alt={recipe.titre} />
            </>
            }
        </Container>
    );
}

export default InfoRecipe;