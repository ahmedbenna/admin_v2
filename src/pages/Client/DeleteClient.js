import React, { Component } from 'react'

import { Grid, Typography, Divider, Button, Dialog, DialogActions, DialogContent } from '@mui/material'

import axios from 'axios'
import { Clear } from '@mui/icons-material'






class DeleteClient extends Component {
    constructor(props) {

        super(props)
        this.state = {
           
        }
    }
   
    handleDelete = e => {
        const url = 'http://localhost:8088/client/deleteClient/'+this.props.c.id
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


                <div>
                    <Button just on onClick={handleClickOpen}><Clear /></Button>

                    <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">

                        <DialogContent>
                            <Typography> supprimer {this.props.c.firstName} {this.props.c.lastName} ?</Typography>
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
        )
    }
}
export default (DeleteClient)