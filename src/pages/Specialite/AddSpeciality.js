import React, { Component } from 'react'

import { TextField, Button,Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@mui/material'
import axios from 'axios'
import { Add } from '@mui/icons-material'


export default class AddSpeciality extends Component {
    constructor() {
        super()
        this.state = {
            speciality: '',
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
            label: this.state.speciality
        }
        axios.post('http://localhost:8088/speciality/add', data)
            .then(res => {
                console.log(res)
                window.location.reload(false)

                // localStorage.removeItem('specialitys')
            })
            .catch(err=>console.log(err.response))
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
                <Button variant="text" color="primary" onClick={handleClickOpen}> Add Speciality
                   <Add />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Speciality</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit} style={{ padding: '20px' }}>

                            <Grid spacing={2} justifyContent='center' container sx={11}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='speciality'
                                    //    style={{ width:'200px'}}
                                        label='Ajouter speciality'
                                        value={this.state.speciality}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                
                            </Grid>

                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleSubmit}>add</Button>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div >
        )
    }
}
