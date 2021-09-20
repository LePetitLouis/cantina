import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';

import FilterContext from '../services/filterContext'

// Material components
import {AppBar, Toolbar, Typography, Paper, InputBase, Divider, Accordion, AccordionSummary, AccordionDetails, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

// Material icon
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '50%',
      position: 'relative',
      margin: 'auto'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    boxfilter: {
        position: 'absolute',
        top: '110%',
        width: '100%',
        left: '0',
    }
}));

function Header() {
    const classes = useStyles();

    const [openFilter, setOpenFilter] = useState(false)

    const { listFilter, updateFilter } = useContext(FilterContext)

    const toggleFilter = () => {
        openFilter ? setOpenFilter(false) : setOpenFilter(true)
    }

    const addFilter = (filter, libelle) => {
        switch(filter) {
            case 'title': 
                if(libelle === '') updateFilter({...listFilter, title: undefined})
                else updateFilter({...listFilter, title: libelle})
                break;
            case 'level':
                if(listFilter.level === libelle) updateFilter({...listFilter, level: undefined})
                else updateFilter({...listFilter, level: libelle})
                break;
            case 'numberPerson':
                if(listFilter.numberPerson === libelle) updateFilter({...listFilter, numberPerson: undefined})
                else updateFilter({...listFilter, numberPerson: libelle})
                break;
            case 'preparationTime':
                    if(listFilter.preparationTime === libelle) updateFilter({...listFilter, preparationTime: undefined})
                    else updateFilter({...listFilter, preparationTime: libelle})
                    break;
            default:
                break;
        }

    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5">
                    <Link to='/' style={{ color: 'white' }}>Cantina</Link>
                </Typography>

                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Je cherche une recette..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={listFilter.title}
                        onChange={event => addFilter("title", event.target.value)}
                    />
                    <IconButton className={classes.iconButton} type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => toggleFilter()}>
                        <FilterListIcon />
                    </IconButton>

                    {openFilter &&
                    <Box className={classes.boxfilter}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Niveau</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" justifyContent="center" mb={2} width="100%">
                                    <Button onClick={() => addFilter("level","padawan")} variant="outlined" color={ listFilter.level === 'padawan' ? 'secondary' : 'default'} style={{ textTransform: 'initial' }}>Padawan</Button>
                                    <Button onClick={() => addFilter("level","jedi")} variant="outlined" color={ listFilter.level === 'jedi' ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>Jedi</Button>
                                    <Button onClick={() => addFilter("level","maitre")} variant="outlined" color={ listFilter.level === 'maitre' ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>Maitre</Button>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography>Nombre de personne</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" justifyContent="center" mb={2} width="100%">
                                    <Button onClick={() => addFilter("numberPerson",1)} variant="outlined" color={listFilter.numberPerson === 1 ? 'secondary' : 'default'} style={{ textTransform: 'initial' }}>1-3 personnes</Button>
                                    <Button onClick={() => addFilter("numberPerson",2)} variant="outlined" color={listFilter.numberPerson === 2 ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>4-6 personnes</Button>
                                    <Button onClick={() => addFilter("numberPerson",3)} variant="outlined" color={listFilter.numberPerson === 3 ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>7 personnes et plus</Button>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            >
                            <Typography>Temps de préparation</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" justifyContent="center" mb={2} width="100%">
                                    <Button onClick={() => addFilter("preparationTime",15)} variant="outlined" color={listFilter.preparationTime === 15 ? 'secondary' : 'default'} style={{ textTransform: 'initial' }}>Moins de 15 minutes</Button>
                                    <Button onClick={() => addFilter("preparationTime",30)} variant="outlined" color={listFilter.preparationTime === 30 ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>Moins de 30 minutes</Button>
                                    <Button onClick={() => addFilter("preparationTime",45)} variant="outlined" color={listFilter.preparationTime === 45 ? 'secondary' : 'default'} style={{ marginLeft: "4%", textTransform: 'initial' }}>Moins de 45 minutes</Button>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    }
                </Paper>
            </Toolbar>
        </AppBar>
    );
}

export default Header;