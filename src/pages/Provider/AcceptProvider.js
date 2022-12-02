import React, { Component } from 'react'

import { TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import axios from 'axios'

import { Check } from '@material-ui/icons'

export default class Accepterprovider extends Component {
    constructor(props) {
        super(props)
        this.state = {

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

        const url = 'http://localhost:8088/provider/signup' + this.state.id
        axios.put(url)

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
                <Button style={{ backgroundColor: '#00e676' }} variant="contained" color="primary" onClick={handleClickOpen}>
                    <Check />
                </Button>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Accepter médecin</DialogTitle>
                    <DialogContent>
                        <Typography>  </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleSubmit}>Accepter</Button>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        )
    }
}
