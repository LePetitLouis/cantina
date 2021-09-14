import React from 'react';

// Material components
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function AddRecipe() {
    return (
        <main>
            <Container>
                <form>
                    <TextField id="standard-basic" label="Titre" />

                    <FormControl>
                        <InputLabel id="select-label-level">Niveau</InputLabel>
                        <Select
                            labelId="select-label-level"
                            id="simple-select-level"
                        >
                            <MenuItem value="padawan">Padawan</MenuItem>
                            <MenuItem value="jedi">Jedi</MenuItem>
                            <MenuItem value="maitre">Maitre</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField id="standard-basic" label="Nombre de personnes" />
                    <TextField id="standard-basic" label="Temps de préparation" />
                </form>
            </Container>
        </main>
        
    );
}

export default AddRecipe;