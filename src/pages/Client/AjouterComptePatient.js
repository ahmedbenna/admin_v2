import React, { Component } from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, Radio, Typography, Grid, TextField, CssBaseline, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Container } from '@material-ui/core/';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import * as Yup from 'yup'

import { Add } from '@material-ui/icons'
import moment from 'moment';
import { Formik } from 'formik';



const useStyles = makeStyles((theme) => ({

    paper: {
        // paddingTop: '20px',
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


    demande: {
        color: '#224358',
    },
    demande1: {
        fontWeight: '600',
        color: '#2196f3',
    },

    link: {
        textDecoration: 'none',
        color: '#616161',
    },
    formControl: {
        justifyContent: 'center',
        width: 'calc(400px - 5px)',
    },

    presentation: {
        width: '400px',
        borderRadius: '5px',
        backgroundColor: '#F0F0F0',
        borderColor: '#bdbdbd',

    },



}));
const styles = {




    link: {
        textDecoration: 'none',
        color: '#616161',
    },
    formControl: {
        justifyContent: 'center',
        width: 'calc(400px - 5px)',
    },

    presentation: {
        width: '400px',
        borderRadius: '5px',
        backgroundColor: '#F0F0F0',
        borderColor: '#bdbdbd',

    },


}

const INTIAL_FORM_STATE = {
    email: "",
    moteDePasse: "",
    cmoteDePasse: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    telephone: "",
    adresse: "",

}

const minDate = moment(new Date()).subtract(18, 'years')._d
console.log(minDate)


const validationSchema = Yup.object({
    nom: Yup.string()
        .required('Obligatoire'),
    prenom: Yup.string()
        .required('Obligatoire'),
    email: Yup.string()
        .required('Obligatoire')
        .email('Invalid email'),
    moteDePasse: Yup.string()
        .required('Obligatoire')
        .min(8, 'il faut plus que 8 caractére'),
    cmoteDePasse: Yup.string()
        .required('Obligatoire')
        .oneOf([Yup.ref('moteDePasse'), null], 'mote de passe incorrecte'),


    telephone: Yup.number()
        .typeError(' Numero est invalide')
        .required('Obligatoire')
        .max(99999999, 'Numero invalide')
        .min(10000000, 'Numero invalide'),
    adresse: Yup.string()
        .required('Obligatoire'),
    dateDeNaissance: Yup.date()
        .max(minDate, "Date de naissance est invalide")
        .required('Obligatoire'),


})
export default function AjouterComptePatient() {
    const classes = useStyles();
    const [genre, setGenre] = React.useState('femme');
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
            <Button variant="text" color="primary" onClick={handleClickOpen}> ajouter compte patient
                   <Add />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ajouter Compte Patient</DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="xs" style={{  backgroundColor: '#FFFFFF', borderRadius: "15px" }}>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="body1" style={{ color: '#224358', padding: '20px', fontWeight: "600" }}>
                                
                    </Typography>
                            <Formik
                                initialValues={{
                                    ...INTIAL_FORM_STATE
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        // alert(JSON.stringify(values, null, 2));
                                        const data = {
                                            email: values.email,
                                            motDePasse: values.moteDePasse,
                                            patientPrincipal: {
                                                email: values.email,
                                                nom: values.nom,
                                                prenom: values.prenom,
                                                genre: genre,
                                                adresse: values.adresse,
                                                dateDeNaissance: values.dateDeNaissance,
                                                telephone: values.telephone
                                            }
                                        };
                                        console.log(data)
                                        axios.post('comptePatients', data)
                                            .then(res => {
                                                console.log('sig', res)
                                                // getPat(values.email)
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
                                                    name='email'
                                                    label="Email"
                                                    type="email"
                                                    value={props.values.email}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.email && Boolean(props.errors.email)}
                                                    helperText={props.touched.email && props.errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size='small'
                                                    variant='outlined'
                                                    name='moteDePasse'
                                                    label="Mot de passe"
                                                    type='password'
                                                    value={props.values.moteDePasse}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.moteDePasse && Boolean(props.errors.moteDePasse)}
                                                    helperText={props.touched.moteDePasse && props.errors.moteDePasse}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size='small'
                                                    variant='outlined'
                                                    name='cmoteDePasse'
                                                    label="Confirmer Mot de passe"
                                                    type='password'
                                                    value={props.values.cmoteDePasse}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.cmoteDePasse && Boolean(props.errors.cmoteDePasse)}
                                                    helperText={props.touched.cmoteDePasse && props.errors.cmoteDePasse}
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
                                                <Button className={classes.submit} fullWidth type="submit"  >Ajouter</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                                {/* </Form> */}
                            </Formik>
                        </div>
                    </Container>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Annuler
                        </Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}

