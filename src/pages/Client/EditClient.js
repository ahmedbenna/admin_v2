import React, { Component } from 'react'

import { Dialog, DialogTitle, DialogActions, DialogContent, Radio, Grid, TextField, Button, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios'

import * as Yup from 'yup'

import { Formik } from 'formik';
import moment from 'moment';
import { Edit } from '@mui/icons-material';


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


// handleSubmit = e => {
//     this.setState({ open: false })
//     const data = {
//         nom: this.state.nom,
//         prenom: this.state.prenom,
//         dateDeNaissance: this.state.dateDeNaissance,
//         adresse: this.state.adresse,
//         telephone: this.state.telephone,
//         genre: this.state.genre
//     };
//     console.log(data)

//     const url = 'administrateurs/patients/' + this.state.id
//     axios.put(url, data)
//         .then(res => {
//             window.location.reload(false)
//             console.log(res)
//         })
//         .catch(err => console.log(err));


//     const url1 = 'administrateurs/comptePatients/' + this.props.comptePat.id
//     axios.put(url1, { "email": this.state.email })
//         .then(res => {
//             window.location.reload(false)
//             console.log(res)
//         })
//         .catch(err => console.log(err))
function EditClient(props) {
    const [genre, setGenre] = React.useState(props.comptePat.patientPrincipal.genre);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true );
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
                <DialogTitle id="form-dialog-title">modifier Medecin</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            email: props.comptePat.email,
                            nom: props.comptePat.patientPrincipal.nom,
                            prenom: props.comptePat.patientPrincipal.prenom,
                            dateDeNaissance: props.comptePat.patientPrincipal.dateDeNaissance,
                            telephone: props.comptePat.patientPrincipal.telephone,
                            adresse: props.comptePat.patientPrincipal.adresse,
                        }}  
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                const data = {
                                    nom: values.nom,
                                    email: props.pat.email,
                                    prenom: values.prenom,
                                    dateDeNaissance: values.dateDeNaissance,
                                    adresse: values.adresse,
                                    telephone: values.telephone,
                                    genre: values.genre
                                };
                                console.log(data)

                                const url = 'http://localhost:8088/client/' +props.comptePat.id
                                axios.put(url, data)
                                    .then(res => {
                                        window.location.reload(false)
                                        console.log(res)
                                    })
                                    .catch(err => console.log(err));


                                const url1 = 'administrateurs/comptePatients/' +props.comptePat.id
                                axios.put(url1, { "email": values.email })
                                    .then(res => {
                                        window.location.reload(false)
                                        console.log(res)
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
                                        <Button fullWidth type="submit"  >Modifier</Button>
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


export default (EditClient)
