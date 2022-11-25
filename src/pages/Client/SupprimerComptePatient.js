import React, { Component } from 'react'

import { Grid, Typography, Divider, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { Clear } from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'



const styles = {

    link: {
        textDecoration: 'none',
        color: 'rgb(0 35 75)'
    },

};


class SupprimerComptePatient extends Component {
    constructor(props) {

        super(props)
        this.state = {
           
        }
    }
   
    handleDelete = e => {
        const url = 'administrateurs/comptePatients/'+this.props.comptePat.id
        axios.delete(url)
            .then(res => { 
                window.location.reload(false)
                console.log(res) })
            .catch(err => { console.log(err) })
        this.setState({ open: false })

    }

    render() {
        const { classes } = this.props;
        

        const handleClickOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };

        return (
            <div className={classes.contaier}>






                <div>
                    <Button just on onClick={handleClickOpen}><Clear /></Button>

                    <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">

                        <DialogContent>
                            <Typography> supprimer {this.props.nom} {this.props.prenom} ?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDelete} color="primary">
                                Confermers
                                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Annuler
                                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>





            </div>
        )
    }
}
export default withStyles(styles)(SupprimerComptePatient)