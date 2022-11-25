
import React from "react";

import { withStyles } from '@material-ui/core/styles';


import { Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@material-ui/core";

import axios from "axios";

import { ExpandMore } from '@material-ui/icons/ExpandMore';

import SupprimerComptePatient from "./SupprimerComptePatient";
import ModifierComptePatient from "./ModifierComptePatient";
import AjouterComptePatient from "./AjouterComptePatient";
import SupprimerPatient from "./SupprimerPatient";
import ModifierPatient from "./ModifierPatient";

import moment from 'moment'
import AjouterPatient from "./AjouterPatient";
import Membres from "./Membres";
import { withRouter } from "react-router";



const styles = {
    paper: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: '10px',

    },
    form: {
        width: '100%',
        marginTop: '10px',
    },
    submit: {

        margin: '20px',
        color: '#FFFFFF',
        // backgroundColor: '#2196F3',
    },
    link: {
        textDecoration: 'none',
        color: '#616161',
    }
}
class Patients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cPatient: '',
            patient: '',
            api: false
        };
    }
    componentDidMount() {
        this.getcomptePatient();
    }
    getcomptePatient = () => {
        axios
            .get("client/signup")
            .then(data => {
                if (data.data.length !== 0) {
                    this.setState({ cPatient: data.data })
                    console.log(data)
                } else {
                    this.setState({ api: true })
                }
            })
            .catch(err => {
                // if(err.response.status == 401){
                //     localStorage.removeItem("token")
                //     localStorage.removeItem("admin")
                //     window.location= '/'

                // }
                console.log(err);
            });
    };
    render() {
        const { classes } = this.props;

        return (
            <div style={{ width: "100%" }}>
                <div align='right' >
                    <AjouterComptePatient />
                </div>
                {(this.state.api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                    ) :
                    (this.state.cPatient) ? (
                        <TableContainer >
                            <Table size='small' className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Nom</TableCell>
                                        <TableCell align="center">Prénom</TableCell>
                                        <TableCell align="center">Date de naissance</TableCell>
                                        <TableCell align="center">Adresse</TableCell>
                                        <TableCell align="center">Téléphone</TableCell>
                                        <TableCell align="center">Genre</TableCell>
                                        <TableCell align="center">Supprimer</TableCell>
                                        <TableCell align="center">Modifier</TableCell>
                                        <TableCell align='center' >Ajouter membre</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.cPatient.map(cpat =>
                                        <TableRow key={cpat.id}>
                                            <TableCell component="th" scope="row">{cpat.id}</TableCell>
                                            <TableCell align="center"> {cpat.email} </TableCell>
                                            <TableCell align="center"> {cpat.patientPrincipal.nom} </TableCell>
                                            <TableCell align="center"> {cpat.patientPrincipal.prenom} </TableCell>
                                            <TableCell align="center"> {moment(cpat.patientPrincipal.dateDeNaissance).calendar()} </TableCell>
                                            <TableCell align="center"> {cpat.patientPrincipal.adresse} </TableCell>
                                            <TableCell align="center"> {cpat.patientPrincipal.telephone} </TableCell>
                                            <TableCell align="center"> {cpat.patientPrincipal.genre} </TableCell>
                                            <TableCell align="center">  <SupprimerComptePatient comptePat={cpat} /> </TableCell>
                                            <TableCell align="center">  <ModifierComptePatient comptePat={cpat} pat={cpat} /> </TableCell>
                                            <TableCell align="center">  <AjouterPatient id={cpat.id} pat={cpat} /> </TableCell>
                                            <TableCell align="center">  <Membres id={cpat.id} /> </TableCell>


                                        </TableRow>


                                    )}

                                </TableBody>

                            </Table>
                        </TableContainer>
                    )
                        :
                        (<div align='center'>
                            <CircularProgress />
                        </div>)
                }

            </div>
        );
    }
}
export default withRouter(withStyles(styles)(Patients))