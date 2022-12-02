import React, { Component } from 'react'

import { TextField, TextareaAutosize, FormControl, Select, InputLabel, MenuItem, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, CircularProgress } from '@mui/material'
import axios from 'axios'


import * as Yup from 'yup'

import { Formik } from 'formik';
import moment from 'moment';
import { Edit } from '@mui/icons-material';


const styles = {
    paper: {
        // marginTop: "50px" ,
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

    btn: {
        backgroundColor: '#1de9b6',
        color: '#FFFFFF',
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

};
// const INTIAL_FORM_STATE = {



// }

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

    contact: Yup.number()
        .typeError(' Numero est invalide')
        .required('Obligatoire')
        .max(99999999, 'Saisir 8 chiffres')
        .min(10000000, 'Saisir 8 chiffres'),
    contactUrgence: Yup.number()
        .typeError(' Numero est invalide')
        .required('Obligatoire')
        .max(99999999, 'Saisir 8 chiffres')
        .min(10000000, 'Saisir 8 chiffres'),
    adresse: Yup.string()
        .required('Obligatoire'),
    presentation: Yup.string()
        .required('Obligatoire'),


})
class EditProvider extends Component {
    constructor(props) {
        super(props)
        const provider = props.prov
        this.state = {
            specialitys: [],
            citys: [],

            specialite: provider.speciality.idSpeciality,



            city: provider.city.idCity,


            email: provider.email,
            // presentation: provider.presentation,
            api: false,
        }
    }
    componentDidMount() {
        this.getVille();
        this.getSpecialite();
    }
    getVille = () => {
        axios
            .get("http://localhost:8088/city/getAllCity")
            .then(data => {
                this.setState({ citys: data.data })
                console.log(data)
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    getSpecialite = () => {
        axios
            .get("http://localhost:8088/speciality/getAllSpeciality")
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
        }, () => {
            console.log(this.state);
        })
    }

    handleSubmit = e => {
        this.setState({ open: false })
        const data = {
            email: this.state.email,
            nom: this.state.nom,
            prenom: this.state.prenom,
            adresse: this.state.adresse,
            ville: {
                id: this.state.ville
            },
            conact: this.state.conact,
            contactUrgence: this.state.contactUrgence,
            // presentation: this.state.presentation,
            specialite: {
                id: this.state.specialite
            }
        };
        console.log(data)

        const url = "http://localhost:8088/administrateurs/medecins/" + this.state.id
        axios.put(url, data)
            .then(res => {
                console.log(res)
                window.location.reload(false)
            })
            .catch(err => console.log(err));
    };
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
                <Button variant="text" color="primary" onClick={handleClickOpen}>
                    <Edit />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">modifier Medecin</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{
                                email: this.props.med.email,
                                nom: this.props.med.nom,
                                prenom: this.props.med.prenom,
                                dateDeNaissance: this.props.med.dateDeNaissance,
                                contact: this.props.med.conact,
                                contactUrgence: this.props.med.contactUrgence,
                                presentation: this.props.med.presentation,
                                adresse: this.props.med.adresse,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    this.setState({ api: true })
                                    // alert(JSON.stringify(values, null, 2));
                                    const data = {
                                        email: values.email,
                                        nom: values.nom,
                                        prenom: values.prenom,
                                        adresse: values.adresse,
                                        ville: {
                                            id: this.state.ville
                                        },
                                        conact: values.contact,
                                        contactUrgence: values.contactUrgence,
                                        presentation: values.presentation,
                                        specialite: {
                                            id: this.state.specialite
                                        }
                                    };

                                    axios.put('administrateurs/medecins/' + this.props.med.id, data)
                                        .then(res => {
                                            localStorage.setItem('doctorInfo', JSON.stringify(res.data))
                                            window.location.reload(false)
                                            console.log("ssss", res)
                                            this.setState({ api: false })

                                        })
                                        .catch(err => {
                                            if (err.response.status == 401) {
                                                localStorage.removeItem('doctorInfo')
                                                localStorage.removeItem('token')
                                                window.location = '/components/LoginDoc'
                                            }
                                            this.setState({ api: false })
                                            console.log(err)
                                        })
                                }, 500);
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    {/* <div style={{ width: '360px' }}> */}
                                    <Grid container direction='row' justify='center' alignItems="center" spacing={2}>
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
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
                                            <FormControl size='small' variant="outlined" className={classes.formControl}>
                                                <InputLabel >spécialité</InputLabel>
                                                <Select
                                                    labelId="spécialité"
                                                    name="specialite"
                                                    value={this.state.specialite}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.specialitys.map(specia =>
                                                        <MenuItem value={specia.id}> {specia.libelle} </MenuItem >
                                                    )}
                                                </Select>
                                            </FormControl>
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
                                                name='contact'
                                                label="Contact"
                                                type="number"
                                                value={props.values.contact}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                error={props.touched.contact && Boolean(props.errors.contact)}
                                                helperText={props.touched.contact && props.errors.contact}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                variant='outlined'
                                                name='contactUrgence'
                                                label="Contact d'urgence"
                                                type="number"
                                                value={props.values.contactUrgence}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                error={props.touched.contactUrgence && Boolean(props.errors.contactUrgence)}
                                                helperText={props.touched.contactUrgence && props.errors.contactUrgence}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl size='small' variant="outlined" className={classes.formControl}>
                                                <InputLabel >Ville</InputLabel>
                                                <Select
                                                    labelId="citys"
                                                    name="ville"
                                                    value={this.state.ville}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.citys.map(vill =>
                                                        <MenuItem value={vill.id}> {vill.ville} </MenuItem >
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                size='small'
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
                                                size='large'
                                                variant='outlined'
                                                name='presentation'
                                                label="Présentation"
                                                multiline
                                                rowsMax={10}
                                                rowMin={3}
                                                value={props.values.presentation}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                error={props.touched.presentation && Boolean(props.errors.presentation)}
                                                helperText={props.touched.presentation && props.errors.presentation}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ float: 'right' }}>
                                                <Button
                                                    // color='pri'
                                                    type="submit"
                                                    variant="contained"
                                                    // onClick={props.handleSubmit}
                                                    sx={{
                                                        marginTop: '20px',
                                                        marginBottom: '20px',
                                                        color: '#FFFFFF',
                                                        backgroundColor: '#002868',
                                                    }}
                                                >
                                                    Modifier
                                                </Button>
                                            </div>
                                        </Grid>
                                        {(this.state.api == true) ? (
                                            <Grid item xs={12}>
                                                <div align='center'>
                                                    <CircularProgress />
                                                </div>
                                            </Grid>
                                        ) : ('')}

                                    </Grid>
                                </form>
                            )}
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

export default(EditProvider)
