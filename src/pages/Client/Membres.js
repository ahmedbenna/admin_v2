import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'

import {Button, Dialog, DialogTitle,  DialogContent, Typography } from '@mui/material'

import axios from 'axios'
import SupprimerPatient from './SupprimerPatient';
import ModifierPatient from './ModifierPatient';

const styles = {

    table: {
        minWidth: 650,
    },
}




class Membres extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           
            patient: '',
        };

    }
    componentDidMount() {

        const url = "administrateurs/comptePatients/" + this.props.id + "/patients"
        axios
            .get(url)
            .then(data => {
                this.setState({ patient: data.data })
                console.log("member", data)
            })
            .catch(err => {
                if(err.response.status == 401){
                    localStorage.removeItem("token")
                    localStorage.removeItem("admin")
                    window.location= '/'

                }
                console.log(err);
            });
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
            <Button variant="text" color="primary" onClick={handleClickOpen}> afficher memebres
            
         </Button>
         <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Membres</DialogTitle>
             <DialogContent>
             {(this.state.patient !='')?(
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nom</TableCell>
                            <TableCell align="right">Prénom</TableCell>
                            <TableCell align="right">Date de naissance</TableCell>
                            <TableCell align="right">Téléphone</TableCell>
                            <TableCell align="right">Genre</TableCell>
                            <TableCell align="center">Supprimer</TableCell>
                            <TableCell align="center">Modifier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {this.state.patient.map((pat) => (
                            <TableRow key={pat.id}>
                                <TableCell component="th" scope="row">{pat.id}</TableCell>
                                <TableCell align="right">{pat.nom}</TableCell>
                                <TableCell align="right">{pat.prenom}</TableCell>
                                <TableCell align="right">{moment(pat.dateDeNaissance).calendar()}</TableCell>
                                <TableCell align="right">{pat.telephone}</TableCell>
                                <TableCell align="right">{pat.genre}</TableCell>
                                <TableCell align="center">  <SupprimerPatient pat={pat} /> </TableCell>
                                <TableCell align="center">  <ModifierPatient pat={pat} /> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )
            :(<Typography>vide</Typography>)
        }
            </DialogContent>

                </Dialog>
                </div>

        );
    }
}
export default withStyles(styles)(Membres)
