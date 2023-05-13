import React, { Component } from 'react'

import { TextField, Button,Dialog, DialogTitle, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { DeleteForever } from '@mui/icons-material'


export default class SupprimeVille extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            id : props.id,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state);
        })
    }
    handleDelete = e => {
        const url = 'http://localhost:8088/api/publication/'+this.props.id
        axios.delete(url)
            .then(res => { 
                window.location.reload(false)
                console.log(res) })
            .catch(err => { console.log(err) })
        this.setState({ open: false })

    }
    render() {
        const handleClickOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };

        return (
            <div>
                <Button variant="text" color="primary" onClick={handleClickOpen}>
                   <DeleteForever />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Supprimer ville</DialogTitle>
                    <DialogContent>
                        <Typography>  </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleDelete}>Supprimer</Button>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div >
        )
    }
}
