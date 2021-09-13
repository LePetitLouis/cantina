import React, { useEffect, useState } from 'react';

import restfullProvider from '../services/restfullProvider.js';
import Recipe from '../components/Recipe'

import Grid from '@material-ui/core/Grid';

function Home() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        restfullProvider.getAllRecipes()
            .then(response => setRecipes(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <main>
            <Grid 
                container 
                spacing={2}
                direction="row"
                justifyContent="center"
            >
                {recipes && recipes.map(recipe => (
                    <Grid key={recipe.id} item>
                        <Recipe 
                            id={recipe.id}
                            titre={recipe.titre}
                            description={recipe.description}
                            niveau={recipe.niveau}
                            personnes={recipe.personnes}
                            tempsPreparation={recipe.tempsPreparation}
                            photo={recipe.photo}
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Home;