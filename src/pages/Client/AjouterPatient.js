import React, { Component } from 'react'

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@mui/material'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, useFormik } from 'formik'
import * as Yup from 'yup'

import { Add } from '@material-ui/icons'
import moment from 'moment';



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
    submit: {
        marginTop: '20px',
        marginBottom: '20px',
        color: '#FFFFFF',
        backgroundColor: '#002868',
    },


}



const minDate = moment(new Date()).subtract(1, 'days')._d
console.log(minDate)


const validationSchema = Yup.object({
    nom: Yup.string()
        .required('Obligatoire'),
    prenom: Yup.string()
        .required('Obligatoire'),
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
// const INTIAL_FORM_STATE = {
   
//     nom: this.props.pat.nom,
//     prenom: "",
//     dateDeNaissance: "",
//     telephone: this.props.pat.telephone,
//     adresse: this.props.pat.adresse,

// }
class AjouterPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            
            genre: 'femme',
        }
           
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleSubmit = e => {
    //     this.setState({ open: false })
    //     e.preventDefault();
    //     const data = {
    //         nom: this.state.nom,
    //         prenom: this.state.prenom,
    //         dateDeNaissance: this.state.dateDeNaissance,
    //         adresse: this.state.adresse,
    //         telephone: this.state.telephone,
    //         genre: this.state.genre
      
    //       };
    //       const url = 'comptePatients/'+this.state.id+'/patients'
    //       axios.post(url, data)
    //             .then(res => {
    //                 window.location.reload(false)
    //                 console.log(res)})
    //             .catch(err => console.log(err));

            
    // }
    render() {
        const { classes } = this.props;

        const handleClickOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };

        return (
            <div>
                <Button variant="text" color="primary" onClick={handleClickOpen}> ajouter memebre
                   <Add />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Ajouter Membre</DialogTitle>
                    <DialogContent>
                    <Formik
                        initialValues={{
                            nom: this.props.pat.patientPrincipal.nom,
                            prenom: "",
                            dateDeNaissance: "",
                            telephone: this.props.pat.patientPrincipal.telephone,
                            adresse: this.props.pat.patientPrincipal.adresse,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                const data = {
                                    nom: values.nom,
                                    email: this.props.pat.email,
                                    prenom: values.prenom,
                                    dateDeNaissance: values.dateDeNaissance,
                                    adresse: values.adresse,
                                    telephone: values.telephone,
                                    genre: this.state.genre
                                };



                                const url = 'administrateurs/comptePatients/'+this.state.id+'/patients'
                                axios.post(url, data)
                                    .then(res => window.location.reload(false))
                                    .catch(err => console.log(err));
                            }, 1000);
                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
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
                                            variant='outlined'
                                            name='prenom'
                                            label="Prenom"
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
                                            variant='outlined'
                                            name='telephone'
                                            label="Telephone"
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
                                            variant='outlined'
                                            name='adresse'
                                            label="Adresse"
                                            value={props.values.adresse}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            error={props.touched.adresse && Boolean(props.errors.adresse)}
                                            helperText={props.touched.adresse && props.errors.adresse}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
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
                                            <RadioGroup aria-label="gender" name="genre" value={this.state.genre} onChange={this.handleChange}>
                                                <FormControlLabel value="femme" control={<Radio style={{ color: '#0075A4' }} />} label="Femme" />
                                                <FormControlLabel value="homme" control={<Radio style={{ color: '#0075A4' }} />} label="Homme" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth className={classes.submit} type="submit"  >Ajouter</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                        {/* </Form> */}
                    </Formik>
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
}
export default withStyles(styles)(AjouterPatient)