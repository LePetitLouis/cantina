import React, { useEffect, useState } from 'react';

// Service provider api 
import restfullProvider from '../services/restfullProvider.js';

// Components
import Alert from '../components/Alert.jsx';

// Material components
import { Box, Button, Container, Fab, Typography, TextField, InputBase } from '@material-ui/core';

// Material icon
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

// Formik
import { FieldArray, Form, Formik } from 'formik';

// History router
import { useHistory, useParams } from 'react-router-dom'

function AddRecipe() {
    const [alertMessage, setAlertMessage] = useState(false);
    const [form, setForm] = useState({
        titre: '',
        description: '',
        niveau: '',
        personnes: 0,
        tempsPreparation: '',
        ingredients: [],
        etapes: [],
        photo: ''
    })
    const [showForm, setShowForm] = useState(false)

    const {id} = useParams()
    let history = useHistory();

    useEffect(() => {
        if(history.location.pathname !== "/add-recipe"){
            restfullProvider.getRecipeById(id)
                .then(response => {
                    setForm(prevState => {
                        return {
                            ...prevState,
                            titre: response.data.titre,
                            description: response.data.description,
                            niveau: response.data.niveau,
                            personnes: response.data.personnes,
                            tempsPreparation: response.data.tempsPreparation,
                            photo: response.data.photo,
                        }
                    })
                    response.data.ingredients.forEach((ingredient, index = 1) => {
                        setForm(prevState => {
                            return { 
                                ...prevState,
                                ingredients: [
                                    ...prevState.ingredients,
                                    { id: index, quantity: ingredient[0], libelle: ingredient[1] }
                                ]
                            }
                        })
                    })
                    response.data.etapes.forEach((etape, index) => {
                        setForm(prevState => {
                            return {
                                ...prevState,
                                etapes: [
                                    ...prevState.etapes,
                                    { id: index, etape: etape }
                                ]
                            }
                        })
                    })
                    setShowForm(true)
                })
                .catch(response => setAlertMessage(<Alert message={response.message} severity="success" />))
        }
        else {
            setForm(prevState => {
                return {
                    ...prevState,
                    ingredients: [{
                        id: Math.random(),
                        quantity: '',
                        libelle: ''
                    }],
                    etapes: [{
                        id: Math.random(),
                        etape: ''
                    }]
                }
            })
            setShowForm(true)
        } 
    }, [])

    return (
        <>
        { showForm && 
        <Formik 
            initialValues = {{
                titre: form.titre,
                description: form.description,
                niveau: form.niveau,
                personnes: form.personnes,
                tempsPreparation: form.tempsPreparation,
                ingredients: form.ingredients,
                etapes: form.etapes,
                photo: form.photo
            }}
            onSubmit={(values, event) => {
                let etapes = []
                values.etapes.map(preparation => etapes.push(preparation.etape))
                values = {...values, ingredients: values.ingredients.map(ingredient => Object.values(ingredient).splice(1))}
                values = {...values, etapes}
                setAlertMessage()
                
                if(history.location.pathname === "/add-recipe"){
                    restfullProvider.createRecipe(values)
                    .then(() => {
                        setAlertMessage(<Alert message="Recette créée avec succès !" severity="success" />)
                        history.push('/');
                    })
                    .catch(() => setAlertMessage(<Alert message="Un problème est survenu, veuillez réessayer" severity="error" />))
                }
                else{
                    restfullProvider.updateRecipe(id, values)
                    .then(() => {
                        setAlertMessage(<Alert message="Recette mise à jour avec succès !" severity="success" />)
                        history.push('/');
                    })
                    .catch(() => setAlertMessage(<Alert message="Aucune recette trouvée" severity="error" />))
                }
                
            }}
            render={({values, handleChange, setFieldValue}) => (
            <Container style={{ marginTop: '2%', marginBottom: '4%' }}>
                <Form>
                    <Box display="block" mb={4}>
                        <TextField 
                            id="titre"
                            name="titre"
                            value={values.titre} 
                            onChange={handleChange}
                            label="Titre" 
                            required
                            fullWidth
                        />
                    </Box>

                    <Box display="block" mb={4}>
                        <TextField 
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChange} 
                            label="Description" 
                            required
                            fullWidth
                        />
                    </Box>

                    <Box display="block" mb={4}>
                        <TextField 
                            id="photo"
                            name="photo"
                            value={values.photo} 
                            onChange={handleChange}
                            label="Url de la photo" 
                            fullWidth
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-evenly" flexWrap="wrap" mb={4}>
                        <Box display="block" mb={4}>
                            <Typography>
                                Temps de préparation
                            </Typography>

                            <TextField 
                                type="number"
                                id="tempsPreparation"
                                name="tempsPreparation"
                                value={values.tempsPreparation}
                                onChange={handleChange} 
                                label="Temps en minutes" 
                                required
                            />
                        </Box>

                        <Box display="block"mb={4}>
                            <Typography align="center">
                                Niveau *
                            </Typography>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button onClick={() => setFieldValue("niveau", "padawan")} variant="outlined" color={ values.niveau === 'padawan' ? "secondary" : "default" }>Padawan</Button>
                                <Button onClick={() => setFieldValue("niveau", "jedi")} variant="outlined" color={ values.niveau === 'jedi' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Jedi</Button>
                                <Button onClick={() => setFieldValue("niveau", "maitre")} variant="outlined" color={ values.niveau === 'maitre' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Maitre</Button>
                            </Box>
                        </Box>

                        <Box display="block" mb={2}>
                            <Typography align="center">
                                Nombre de personne *
                            </Typography>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Fab size="small" color="secondary" onClick={() => setFieldValue('personnes', values.personnes - 1)}><RemoveIcon /></Fab>
                                <InputBase 
                                    type="number"
                                    id="personnes"
                                    name="personnes"
                                    value={values.personnes}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '20%' }} />
                                <Fab size="small" color="primary" onClick={() => setFieldValue('personnes', values.personnes + 1)}><AddIcon /></Fab>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Box display="block" mb={4}>
                        <FieldArray name="ingredients"
                            render={ arrayHelpers => (
                                <Box>
                                <Typography>
                                    Ingrédients
                                </Typography>
                                <Fab 
                                    size="small" 
                                    color="primary"
                                    onClick={() => arrayHelpers.push({ id: Math.random(), quantity: "", libelle: "" })}
                                >
                                    <AddIcon />
                                </Fab>
                                
                                {values.ingredients.map((ingredient, index) => (
                                    <Box key={index} mt={2}>
                                        <TextField 
                                            id="input-quantity" 
                                            label="Quantitées"
                                            name={`ingredients.[${index}].quantity`}
                                            value={ingredient.quantity}
                                            onChange={handleChange}
                                            style={{ marginRight: '2%' }} 
                                        />
                                        <TextField 
                                            id="input-libelle" 
                                            label="Ingrédient"
                                            name={`ingredients.[${index}].libelle`}
                                            value={ingredient.libelle}
                                            onChange={handleChange}
                                            required
                                            style={{ marginRight: '2%', width: '45%' }} />
                                        <Fab 
                                            size="small" 
                                            color="secondary"
                                            onClick={() => arrayHelpers.remove(index)}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Box>
                                ))}
                                </Box>
                            )}
                        />
                    </Box>

                    <Box display="block" mb={4}>
                            <FieldArray name="etapes"
                                render={ arrayHelpers => (
                                    <Box>
                                    <Typography>
                                        Préparation
                                    </Typography>
                                    <Fab 
                                        size="small" 
                                        color="primary"
                                        onClick={() => arrayHelpers.push({ id: Math.random(), etape: "" })}
                                    >
                                        <AddIcon />
                                    </Fab>
                                    
                                    {values.etapes.map((etape, index) => (
                                        <Box key={index} mt={2}>
                                            <Typography>
                                                Étape {index+1}
                                            </Typography>
                                            <TextField 
                                                id="input-etape" 
                                                label="Description"
                                                name={`etapes.[${index}].etape`}
                                                value={etape.etape}
                                                onChange={handleChange}
                                                required
                                                style={{ width: '90%' }}
                                            />
                                            <Fab 
                                                size="small" 
                                                color="secondary"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                <CloseIcon />
                                            </Fab>
                                        </Box>
                                    ))}
                                    </Box>
                                )}
                            />
                        </Box>

                    { history.location.pathname !== "/add-recipe" ? 
                        <Button color="primary" variant="contained" id="edit" type="submit">
                            Mettre à jour la recette
                        </Button>
                    :
                        <Button color="primary" variant="contained" id="add" type="submit">
                            Ajouter une nouvelle recette
                        </Button>
                    }
                </Form>

                {alertMessage}
            </Container>
            )}
        />
        }
        </>
    );
}

export default AddRecipe;