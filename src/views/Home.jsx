import React, { useContext, useEffect, useState } from 'react';

// Service provider api 
import restfullProvider from '../services/restfullProvider.js';
import FilterContext from '../services/filterContext'

// Components
import Recipe from '../components/Recipe.jsx';
import Alert from '../components/Alert.jsx';

//Material components
import { Container, Grid, Box, Fab } from '@material-ui/core';


// Material icon
import AddIcon from '@material-ui/icons/Add';

// Material style
import { makeStyles } from '@material-ui/styles';

// History router
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

    const { listFilter } = useContext(FilterContext)

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
                    {recipes && 
                    recipes.filter(recipe => listFilter.title !== undefined ? recipe.titre.toLowerCase().includes(listFilter.title?.toLowerCase()) : true)
                    .filter(recipe => listFilter.level !== undefined ? recipe.niveau === listFilter.level : true )
                    .filter(recipe => {
                        let isFilter = true
                        switch(listFilter.numberPerson) {
                            case 1:
                                isFilter = recipe.personnes >= 1 && recipe.personnes <= 3
                                break;
                            case 2:
                                isFilter = recipe.personnes >= 4 && recipe.personnes <= 6
                                break;
                            case 3: 
                                isFilter = recipe.personnes >= 7
                                break;
                            default:
                                break;
                        }
                        return isFilter
                    })
                    .filter(recipe => {
                        let isFilter = true
                        switch(listFilter.preparationTime) {
                            case 15:
                                isFilter = recipe.tempsPreparation <= 15
                                break;
                            case 30:
                                isFilter = recipe.tempsPreparation <= 30
                                break;
                            case 45: 
                                isFilter = recipe.tempsPreparation <= 45
                                break;
                            default:
                                break;
                        }
                        return isFilter
                    })
                    .map(recipe => (
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