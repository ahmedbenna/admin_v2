import React, { Component } from 'react'

import { TextField, Button,Dialog, DialogTitle, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { DeleteForever } from '@mui/icons-material'


export default class DeleteProvider extends Component {
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
       
        const url='http://localhost:8088/api/conducteur/'+this.state.id
        axios.delete(url)
            .then(res => {
                console.log(res)
                window.location.reload(false)
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
                   <DeleteForever />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete driver</DialogTitle>
                    <DialogContent>
                        <Typography>  </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleSubmit}>Delete</Button>

                        <Button onClick={handleClose} color="primary">
                            cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div >
        )
    }
}
