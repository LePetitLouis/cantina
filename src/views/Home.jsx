import React, { useEffect, useState } from 'react';

import restfullProvider from '../services/restfullProvider.js';
import Recipe from '../components/Recipe.jsx';
import Alert from '../components/Alert.jsx';

//Material components
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

import { useHistory } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
    add_btn: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
}))

function Home() {
    const [recipes, setRecipes] = useState([]);

    const classes = useStyle();

    let history = useHistory();

    // Retrieve all recipes
    useEffect(() => {
        restfullProvider.getAllRecipes()
            .then(response => setRecipes(response.data))
            .catch(() => <Alert message="Problème de connection" severity="error" />)
    }, [])

    const redirectToAddRecipe = () => {
        history.push('/add-recipe');
    }

    return (
        <main>
            <Box mt={2}>
                <Grid 
                    container 
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    {recipes && recipes.map(recipe => (
                        <Grid key={recipe.id} item  style={{ width: "300px" }}>
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
            </Box>
            <Fab aria-label="Add" color="primary" className={classes.add_btn} onClick={() => redirectToAddRecipe()}>
                <AddIcon />
            </Fab>
        </main>
    );
}

export default Home;