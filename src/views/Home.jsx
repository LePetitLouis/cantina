import React, { useEffect, useState } from 'react';

// Service provider api 
import restfullProvider from '../services/restfullProvider.js';

// Components
import Recipe from '../components/Recipe.jsx';
import Alert from '../components/Alert.jsx';

//Material components
import { Container } from '@material-ui/core';
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
    const [alertMessage, setAlertMessage] = useState(false);

    const classes = useStyle();

    let history = useHistory();

    // Retrieve all recipes
    useEffect(() => {
        restfullProvider.getAllRecipes()
            .then(response => setRecipes(response.data))
            .catch(() => setAlertMessage(<Alert message="Problème de connection" severity="error" />))
    }, [])

    // Redirect to page create new recipe 
    const redirectToAddRecipe = () => {
        history.push('/add-recipe');
    }

    // Reduce list recipes when delete recipe
    const onListRecipes = (event) => {
        setAlertMessage()
        restfullProvider.deleteRecipe(event)
            .then(() => {
                setRecipes(recipes.filter(recipe => recipe.id !== event))
                setAlertMessage(<Alert message="La recette à bien été supprimer" severity="success" />)
            })
            .catch(() => setAlertMessage(<Alert message="Un problème est survenu, veuillez réessayer" severity="error" />))
    }

    return (
        <Container>
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
                                onListRecipes={onListRecipes}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Fab aria-label="Add" color="primary" className={classes.add_btn} onClick={() => redirectToAddRecipe()}>
                <AddIcon />
            </Fab>

            {alertMessage}
        </Container>
    );
}

export default Home;