import React, { useState } from 'react';

// Material components
import { Box, Button, Container, Fab, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

// Icon
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function AddRecipe() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [level, setLevel] = useState()
    const [numberPerson, setNumberPerson] = useState(0)
    const [listIngredient, setListIngredient] = useState([
        <Box mt={2}>
            <TextField id="input-quantity" label="Quantité" style={{ marginRight: '2%' }} />
            <TextField id="input-libelle" label="Libellé" />
        </Box>
    ])

    const changeTitle = (event) => {
        setTitle(event.target.value)
    }

    const changeDescription = (event) => {
        setDescription(event.target.value)
    }

    const changeLevel = (label) => {
        setLevel(label)
    }

    const changeNumberPerson = (event) => {
        if(event.target.value === '') return setNumberPerson(0)
        setNumberPerson(parseInt(event.target.value, 10))
    }

    const handleClickNumberPerson = (evt) => {
        if(evt === "remove" && numberPerson > 0) setNumberPerson(numberPerson - 1)
        else if(evt === 'add') setNumberPerson(numberPerson + 1)
        else return 
    }

    return (
            <Container style={{ marginTop: '2%' }}>
                <form>
                    <Box display="block" mb={4}>
                        <TextField id="input-title" label="Titre" value={title} onChange={changeTitle} style={{ width: '25%' }} />
                    </Box>

                    <Box display="block" mb={4}>
                        <TextField id="input-description" label="Description" value={description} onChange={changeDescription} style={{ width: '100%' }} />
                    </Box>

                    <Box display="flex" justifyContent="space-evenly" flexWrap="wrap" mb={4}>
                    <Box display="block"mb={4}>
                        <Typography align="center">
                            Niveau *
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button onClick={() => changeLevel("padawan")} variant="outlined" color={ level === 'padawan' ? "secondary" : "default" }>Padawan</Button>
                            <Button onClick={() => changeLevel("jedi")} variant="outlined" color={ level === 'jedi' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Jedi</Button>
                            <Button onClick={() => changeLevel("maitre")} variant="outlined" color={ level === 'maitre' ? "secondary" : "default" } style={{ marginLeft: "4%" }}>Maitre</Button>
                        </Box>
                    </Box>

                    <Box display="block" mb={2}>
                        <Typography align="center">
                            Nombre de personnes *
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Fab size="small" color="secondary" onClick={() => handleClickNumberPerson('remove')}><RemoveIcon /></Fab>
                            <InputBase id="input-numberPerson" value={numberPerson} onChange={changeNumberPerson} style={{ width: '20%' }} />
                            <Fab size="small" color="primary" onClick={() => handleClickNumberPerson('add')}><AddIcon /></Fab>
                        </Box>
                    </Box>
                    </Box>

                    <Box display="block" mb={2}>
                        Temps de préparation
                    </Box>

                    {/* <Box display="block" mb={2}>
                        <Typography variant="h5">
                            Ingrédients
                        </Typography>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Box mt={2}>
                            <TextField id="input-quantity" label="Quantité" style={{ marginRight: '2%' }} />
                            <TextField id="input-libelle" label="Libellé" />
                        </Box>
                    </Box> */}
                    
                    <Box display="block" mb={4}>
                        <Typography>
                            Ingrédients
                        </Typography>
                        {listIngredient.map(() => (
                            <Box mt={2}>
                                <TextField id="input-quantity" label="Quantité" style={{ marginRight: '2%' }} />
                                <TextField id="input-libelle" label="Libellé" style={{ marginRight: '2%', width: '45%' }} />
                                <Fab size="small" color="primary">
                                    <AddIcon />
                                </Fab>
                            </Box>
                        ))}
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
                </form>
            </Container>
        
    );
}

export default AddRecipe;