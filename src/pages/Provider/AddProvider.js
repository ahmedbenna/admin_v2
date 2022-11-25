import React, { Component } from 'react'

import { FormControl,TextareaAutosize,MenuItem ,Select,InputLabel,    TextField, Button,Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@mui/material'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';


import {Add} from '@material-ui/icons'
import * as Yup from 'yup'

import { Formik } from 'formik';



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
    password: "",
    cPassword: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    contact: "",
    contactUrgence:"",
    presentation:"",
    adresse: "",

}




const validationSchema = Yup.object({
    nom: Yup.string()
        .required('Obligatoire'),
    prenom: Yup.string()
        .required('Obligatoire'),
    email: Yup.string()
        .required('Obligatoire')
        .email('Invalid email'),
    password: Yup.string()
        .required('Obligatoire')
        .min(8, 'il faut plus que 8 caractére'),
    cPassword: Yup.string()
        .required('Obligatoire')
        .oneOf([Yup.ref('password'), null], 'mote de passe incorrecte'),
    contact: Yup.number()
        .typeError(' Numero est invalide')
        .required('Obligatoire')
        .max(99999999, 'Numero invalide')
        .min(10000000, 'Numero invalide'),
    contactUrgence: Yup.number()
        .typeError(' Numero est invalide')
        .required('Obligatoire')
        .max(99999999, 'Numero invalide')
        .min(10000000, 'Numero invalide'), 
    adresse: Yup.string()
        .required('Obligatoire'),
    presentation: Yup.string()
        .required('Obligatoire'),


})
function getProvider(id) {
    const url = 'provider/' + id
    axios
        .get(url)
        .then(res => {
            console.log('getProvider', res)
            localStorage.setItem('providerInfo', JSON.stringify(res.data))
        })

}

class AddProvider extends Component {
    constructor() {
        super()
        this.state = {
            
            citys: [],
            city: '',
            
            specialitys: [],
            speciality: '',
            
        }
    }
    componentDidMount() {
        this.getCity();
        this.getSpeciality();
    }
    getCity = () => {
        axios
            .get("city/getAllCity")
            .then(data => {
                this.setState({ citys: data.data })
                console.log(data)
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };
    getSpeciality = () => {
        axios
            .get("speciality/getAllSpeciality")
            .then(data => {
                this.setState({ specialitys: data.data })
                console.log(data)
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleSubmit = e => {
    //     this.setState({ open: false })
    //     e.preventDefault();
    //     const data = {
    //         email: this.state.email,
    //         motDePasse: this.state.motDePasse,
    //         nom: this.state.nom,
    //         prenom: this.state.prenom,
    //         adresse: this.state.adresse,
    //         ville: {
    //             id: this.state.ville
    //         },
    //         conact: this.state.conact,
    //         contactUrgence: this.state.contactUrgence,
    //         presentation: this.state.presentation,
    //         specialite: {
    //             id: this.state.specialite
    //         }
    //     }
    //     axios.post('medecins/', data)
    //         .then(res => {
    //             console.log(res)
    //             window.location.reload(false)

    //         })
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
                <Button variant="text" color="primary" onClick={handleClickOpen}> Add provider
                   <Add />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add provider</DialogTitle>
                    <DialogContent>
                    <Formik
                                initialValues={{
                                    ...INTIAL_FORM_STATE
                                }}
                                validationSchema={validationSchema}
                                
                                onSubmit={(values, actions) => {
                                    
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        const data = {
                                            email: values.email,
                                            password: values.password,
                                            firstName: values.nom,
                                            lastName: values.prenom,
                                            street: values.adresse,
                                            city: {
                                                idCity: this.state.ville
                                            },
                                            phone: values.contact,
                                            // contactUrgence: values.contactUrgence,
                                            // presentation: values.presentation,
                                            speciality: {
                                                idSpecialite: this.state.specialite
                                            }
                                        };
                                        axios.post("provider/signup", data)
                                            .then(res => {
                                                console.log("subbb",res);
                                            })
                                            .catch(err => console.log(err))
                                    }, 1000);
                                }}
                            >
                                {props => (
                                    <form onSubmit={Formik.handleSubmit} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='nom'
                                                    id='nom'
                                                    label="FirstNam"
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
                                                    label="LastName"
                                                    value={props.values.prenom}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.prenom && Boolean(props.errors.prenom)}
                                                    helperText={props.touched.prenom && props.errors.prenom}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel >Specialite</InputLabel>
                                                    <Select
                                                        labelId="Speciality"
                                                        name="specialite"
                                                        value={this.state.specialite}
                                                        onChange={this.handleChange}
                                                    >
                                                        {this.state.specialitys.map(specia =>
                                                            <MenuItem value={specia.idSpeciality}> {specia.label} </MenuItem >
                                                        )}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
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
                                                    variant='outlined'
                                                    name='password'
                                                    label="Password"
                                                    type='password'
                                                    value={props.values.password}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.password && Boolean(props.errors.password)}
                                                    helperText={props.touched.password && props.errors.password}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='cPassword'
                                                    label="Conferme Password"
                                                    type='password'
                                                    value={props.values.cPassword}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.cPassword && Boolean(props.errors.cPassword)}
                                                    helperText={props.touched.cPassword && props.errors.cPassword}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='contact'
                                                    label="Phone"
                                                    type="number"
                                                    value={props.values.contact}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.contact && Boolean(props.errors.contact)}
                                                    helperText={props.touched.contact && props.errors.contact}
                                                />
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='contactUrgence'
                                                    label="Contact urgence"
                                                    type="number"
                                                    value={props.values.contactUrgence}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.contactUrgence && Boolean(props.errors.contactUrgence)}
                                                    helperText={props.touched.contactUrgence && props.errors.contactUrgence}
                                                />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel >City</InputLabel>
                                                    <Select
                                                            labelId="citys"
                                                        name="ville"
                                                        value={this.state.ville}
                                                        onChange={this.handleChange}
                                                    >   
                                                        {this.state.citys.map(vill =>
                                                            <MenuItem value={vill.idCity}> {vill.label} </MenuItem >
                                                        )}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='adresse'
                                                    label="Street"
                                                    value={props.values.adresse}
                                                    onChange={props.handleChange}
                                                    error={props.touched.adresse && Boolean(props.errors.adresse)}
                                                    helperText={props.touched.adresse && props.errors.adresse}
                                                />
                                            </Grid>
                                           
                                            
                                            {/* <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    name='presentation'
                                                    label="Presentation"
                                                    multiline
                                                    rowsMax={8}
                                                    value={props.values.presentation}
                                                    onChange={props.handleChange}
                                                    error={props.touched.presentation && Boolean(props.errors.presentation)}
                                                    helperText={props.touched.presentation && props.errors.presentation}
                                                />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <Button
                                                    // color='secondary'
                                                    type="submit"
                                                    fullWidth
                                                    style={{color:"#FFFFFF", backgroundColor:"#002868"}}
                                                    
                                                    variant="contained"
                                                    className={classes.submit}
                                                >
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                    </DialogContent>

                    <DialogActions>
                        {/* <Button onClick={this.handleSubmit}>Ajouter</Button> */}

                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div >
        )
    }
}
export default withStyles(styles)(AddProvider)