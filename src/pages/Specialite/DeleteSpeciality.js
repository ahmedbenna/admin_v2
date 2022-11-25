import React, { Component } from 'react'

import { TextField, Button,Dialog, DialogTitle, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import axios from 'axios'

import {DeleteForever} from '@material-ui/icons'

export default class DeleteSpeciality extends Component {
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
    handleSubmit = e => {
        this.setState({ open: false })
        e.preventDefault();
       
        const url='specialites/'+this.state.id
        axios.delete(url)
            .then(res => {
                console.log(res)
                localStorage.removeItem('specialites')
                window.location.reload(false)
            })
    }
    render() {
        console.log(this.state)
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
                    <DialogTitle id="form-dialog-title">Supprimer specialite</DialogTitle>
                    <DialogContent>
                        <Typography>  </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleSubmit}>Supprimer</Button>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div >
        )
    }
}
