import React, { Component } from 'react'

import { TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@mui/material'
import axios from 'axios'

import { Add } from '@material-ui/icons'

export default class AjouterVille extends Component {
  constructor() {
    super()
    this.state = {
      ville: '',
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
      label: this.state.ville
    }
    axios.post('city/add', data)
      .then(res => {
        console.log(res)
        window.location.reload(false)

        localStorage.removeItem('villes')
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
        <Button variant="text" color="primary" onClick={handleClickOpen}> ajouter Ville
          <Add />
        </Button>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Ajouter Ville</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} style={{ padding: '20px' }}>

              <Grid spacing={2} justifyContent='center' container sx={11}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name='ville'
                    style={{ width: '200px' }}
                    label='Ajouter Ville'
                    value={this.state.ville}
                    onChange={this.handleChange}
                  />
                </Grid>

              </Grid>

            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleSubmit}>Ajouter</Button>

            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
          </DialogActions>
        </Dialog>

      </div >
    )
  }
}
