import React from 'react';

// Material components
import { Box, Button, Container, Fab, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

// Icon
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

// Formik
import { FieldArray, useFormik } from 'formik';

function AddRecipe() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            level: '',
            numberPerson: 0,
            preparationTime: 0,
            ingredients: [{
                id: Math.random(),
                quantity: '',
                libelle: ''
            }],
            preparation: [{
                etape: ''
            }]
        },

    })

    return (
            <Container style={{ marginTop: '2%' }}>
                <form>
                    <Box display="block" mb={4}>
                        <TextField 
                            id="title"
                            name="title"
                            value={formik.values.title} 
                            onChange={formik.handleChange}
                            label="Titre" 
                            fullWidth
                        />
                    </Box>

                    <Box display="block" mb={4}>
                        <TextField 
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange} 
                            label="Description" 
                            fullWidth
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-evenly" flexWrap="wrap" mb={4}>
                    <Box display="block"mb={4}>
                        <Typography align="center">
                            Niveau *
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button onClick={() => formik.setFieldValue("level", "padawan")} variant="outlined" color={ formik.values.level === 'padawan' ? "secondary" : "default" }>Padawan</Button>
                            <Button onClick={() => formik.setFieldValue("level", "jedi")} variant="outlined" color={ formik.values.level === 'jedi' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Jedi</Button>
                            <Button onClick={() => formik.setFieldValue("level", "maitre")} variant="outlined" color={ formik.values.level === 'maitre' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Maitre</Button>
                        </Box>
                    </Box>

                    <Box display="block" mb={2}>
                        <Typography align="center">
                            Nombre de personnes *
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Fab size="small" color="secondary" onClick={() => formik.setFieldValue('numberPerson', formik.values.numberPerson - 1)}><RemoveIcon /></Fab>
                            <InputBase 
                                type="number"
                                id="numberPerson"
                                name="numberPerson"
                                value={formik.values.numberPerson}
                                onChange={formik.handleChange}
                                style={{ width: '20%' }} />
                            <Fab size="small" color="primary" onClick={() => formik.setFieldValue('numberPerson', formik.values.numberPerson + 1)}><AddIcon /></Fab>
                        </Box>
                    </Box>
                    </Box>

                    <Box display="block" mb={2}>
                        Temps de préparation
                    </Box>
                    
                    <Box display="block" mb={4}>
                        <FieldArray name="ingredients"
                            render={ arrayHelpers => (
                                <Box>
                                <Typography>
                                    Ingrédients
                                </Typography>
                                
                                {formik.values.ingredients.map((ingredient, index) => (
                                    <Box key={index} mt={2}>
                                        <TextField 
                                            id="input-quantity" 
                                            label="Quantité"
                                            name={`ingredients.[${index}].quantity`}
                                            style={{ marginRight: '2%' }} 
                                        />
                                        <TextField 
                                            id="input-libelle" 
                                            label="Libellé"
                                            name={`ingredients.[${index}].libelle`}
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
                                <Fab 
                                    size="small" 
                                    color="primary"
                                    onClick={() => arrayHelpers.push({ id: Math.random(), quantity: "", libelle: "" })}
                                >
                                    <AddIcon />
                                </Fab>
                                </Box>
                            )}
                        />
                    </Box>

                    <Box display="block" mb={2}>
                        <Typography>
                            Préparation
                        </Typography>
                        
                        <Box mt={2}>
                            <Typography>
                                Étape 1
                            </Typography>
                            <Box mt={2}>
                                <TextField label="Description" style={{ width: '75%' }} />
                                <Fab size="small" color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </Box>
                        </Box>
                    </Box>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        
    );
}

export default AddRecipe;