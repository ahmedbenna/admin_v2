import React, { Component } from 'react'

import { Dialog, DialogTitle, DialogActions, DialogContent, Radio, Grid, TextField, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, Typography } from '@material-ui/core/';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup'


import { Edit } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    submit: {
        marginTop: '20px',
        marginBottom: '20px',
        color: '#FFFFFF',
        backgroundColor: '#002868',
    },
    link: {
        textDecoration: 'none',
        fontWeight: '600',
        color: '#2196f3',
    },

    demande: {
        color: '#224358',
    },
    demande1: {
        fontWeight: '600',
        color: '#2196f3',
    }


}));
const patient = JSON.parse(localStorage.getItem('patientInfo'))
console.log(JSON.parse(localStorage.getItem('patientInfo')))





// console.log("eeeeeeeeee", INTIAL_FORM_STATE())





const minDate = moment(new Date()).subtract(18, 'years')._d
console.log(minDate)


const validationSchema = Yup.object({
    nom: Yup.string(),

    prenom: Yup.string(),

    email: Yup.string()
        .email(' Email non valide'),
    moteDePasse: Yup.string()
        .min(8, 'Il faut saisir plus que 8 caractéres'),
    cmoteDePasse: Yup.string()
        .oneOf([Yup.ref('moteDePasse'), null], 'Mot de passe incorrecte'),


    telephone: Yup.number()
        .typeError(' Numero est invalide')
        .max(99999999, 'Numéro non valide')
        .min(10000000, 'Numéro non valide'),
    adresse: Yup.string(),

    dateDeNaissance: Yup.date()
        .max(minDate, "Age minimal 18 ans")



})



function ModifierPatient(props) {
    const classes = useStyles();
    const [genre, setGenre] = React.useState(props.pat.genre);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" color="primary" onClick={handleClickOpen}>
                <Edit />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Modifier compte patient</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            nom: props.pat.nom,
                            prenom: props.pat.prenom,
                            dateDeNaissance: props.pat.dateDeNaissance,
                            telephone: props.pat.telephone,
                            adresse: props.pat.adresse,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                const data = {

                                    nom: values.nom,
                                    prenom: values.prenom,
                                    genre: genre,
                                    adresse: values.adresse,
                                    dateDeNaissance: values.dateDeNaissance,
                                    telephone: values.telephone

                                };
                                console.log(data)
                                const url = 'administrateurs/patients/' + props.pat.id
                                axios.put(url, data)
                                    .then(res => {
                                        console.log(res)
                                        window.location.reload(false)
                                    })
                                    .catch(err => console.log(err))
                            }, 1000);
                        }}
                    >
                        {/* <Form > */}
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            name='nom'
                                            id='nom'
                                            label="Nom"
                                            value={props.values.nom}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.nom && Boolean(props.errors.nom)}
                                            helperText={props.touched.nom && props.errors.nom}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            name='prenom'
                                            label="Prénom"
                                            value={props.values.prenom}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.prenom && Boolean(props.errors.prenom)}
                                            helperText={props.touched.prenom && props.errors.prenom}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            name='telephone'
                                            label="Téléphone"
                                            type="number"
                                            value={props.values.telephone}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.telephone && Boolean(props.errors.telephone)}
                                            helperText={props.touched.telephone && props.errors.telephone}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            name='adresse'
                                            label="Adresse"
                                            value={props.values.adresse}
                                            onChange={props.handleChange}
                                            error={props.touched.adresse && Boolean(props.errors.adresse)}
                                            helperText={props.touched.adresse && props.errors.adresse}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            name="dateDeNaissance"
                                            label="Date de naissance"
                                            type='date'
                                            InputLabelProps={{ shrink: true }}
                                            value={props.values.dateDeNaissance}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.dateDeNaissance && Boolean(props.errors.dateDeNaissance)}
                                            helperText={props.touched.dateDeNaissance && props.errors.dateDeNaissance}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" >Genre</FormLabel>
                                            <RadioGroup aria-label="gender" name="gener" value={genre} onChange={handleChange}>
                                                <FormControlLabel value="femme" control={<Radio style={{ color: '#0075A4' }} />} label="Femme" />
                                                <FormControlLabel value="homme" control={<Radio style={{ color: '#0075A4' }} />} label="Homme" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button className={classes.submit} fullWidth type="submit"  >Modifier</Button>
                                    </Grid>

                                </Grid>
                            </form>
                        )}
                        {/* </Form> */}
                    </Formik>
                </DialogContent>
            </Dialog>

        </div >
    )
}


export default (ModifierPatient)
