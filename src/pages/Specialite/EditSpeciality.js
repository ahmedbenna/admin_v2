import React, { Component } from 'react'

import { TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@mui/material'
import axios from 'axios'
import { Edit } from '@mui/icons-material'


export default class EditSpeciality extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialite: props.libelle,
            id: props.id,
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
        const data = {

            label: this.state.specialite

        }
        const url = 'http://localhost:8088/speciality/editSpeciality/' + this.state.id
        axios.put(url, data)
            .then(res => {
                console.log(res)
                window.location.reload(false)

                // localStorage.removeItem('specialites')
            })
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
                    <Edit />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">modifier specialite</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit} style={{ padding: '20px' }}>

                            <Grid spacing={2} justifyContent='center' container sx={11}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ width: '200px' }}
                                        name='specialite'
                                        label='Ajouter Specialite'
                                        value={this.state.specialite}
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                            </Grid>

                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleSubmit}>modifier</Button>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        )
    }
}
