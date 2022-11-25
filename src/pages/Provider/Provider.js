import React from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Grid } from "@material-ui/core";
import AddProvider from './AddProvider';
import DeleteProvider from './DeleteProvider';
import EditProvider from './EditProvider';

export default function Provider() {
  return (
    <div style={{ width: "100%" }}>
                <div align='right' >
                    <AddProvider />
                </div>
                <Grid spacing={2} container>
                    <Grid item xs={12} >
                        <Typography variant='h6'> Valide</Typography>
                    </Grid>
                    <Grid item>
                        {
                        // (this.state.api == true) ? (
                        //     <div align='center'>
                        //         <Typography variant='h6'>Vide</Typography>
                        //     </div>
                        //     ) :
                            (this.state.provider) ? (
                                <TableContainer >
                                    <Table size='small'  aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell size='small' align="center">Id</TableCell>
                                                <TableCell size='small' align="center">firstName</TableCell>
                                                <TableCell align="center">lastName</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">speciality</TableCell>
                                                <TableCell align="center">phone</TableCell>
                                                <TableCell align="center">birthday</TableCell>
                                                <TableCell align="center">city</TableCell>
                                                <TableCell align="center">street</TableCell>
                                                {/* <TableCell align="center">Présentation</TableCell> */}
                                                {/* <TableCell align="center">valider</TableCell> */}
                                                <TableCell align="center">Supprimer</TableCell>
                                                <TableCell align="center">Modifier</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.provider.map(prov =>
                                                
                                                    (<TableRow key={prov.id}>
                                                        <TableCell component="th" scope="row">{prov.id}</TableCell>
                                                        <TableCell align="center">{prov.firstName}</TableCell>
                                                        <TableCell align="center">{prov.lastName}</TableCell>
                                                        <TableCell align="center">{prov.email}</TableCell>
                                                        <TableCell align="center">{prov.speciality.label}</TableCell>
                                                        <TableCell align="center">{prov.phone}</TableCell>
                                                        <TableCell align="center">{prov.birthday}</TableCell>
                                                        <TableCell align="center">{prov.city.label}</TableCell>
                                                        <TableCell align="center">{prov.street}</TableCell>
                                                        {/* <TableCell align="center">{prov.presentation}</TableCell> */}
                                                        {/* <TableCell align="center">{(prov.valider) ? <CheckCircle /> : <HighlightOff />}</TableCell> */}
                                                        <TableCell align="center">  <DeleteProvider id={prov.id} /> </TableCell>
                                                        {/* <TableCell align="center">  <EditProvider prov={prov} /> </TableCell> */}
                                                        {/* <TableCell align="center">{(prov.rejeter===true)?  <Accepterprovider id={prov.id}/>:<Rejeterprovider id={prov.id}/>  }</TableCell> */}
                                                    </TableRow>)
                                                    
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )

                                :
                                (<div align='center'>
                                    <CircularProgress />
                                </div>)
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Non valide</Typography>

                    </Grid>
                    <Grid item >
                        {(this.state.api2 == true) ? (
                            <div align='center'>
                                <Typography variant='h6'>Vide</Typography>
                            </div>
                            ) :
                            (this.state.providerR) ? (
                                <TableContainer >
                                    <Table size='small'  aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell size='small' align="center">Id</TableCell>
                                                <TableCell size='small' align="center">nom</TableCell>
                                                <TableCell align="center">prenom</TableCell>
                                                <TableCell align="center">email</TableCell>
                                                <TableCell align="center">specialite</TableCell>
                                                <TableCell align="center">contact</TableCell>
                                                <TableCell align="center">contact urgence</TableCell>
                                                <TableCell align="center">ville</TableCell>
                                                <TableCell align="center">adresse</TableCell>
                                                <TableCell align="center">presentation</TableCell>
                                                {/* <TableCell align="center">valider</TableCell> */}
                                                <TableCell align="center">Supprimer</TableCell>
                                                <TableCell align="center">Modifier</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.providerR.map(med =>
                                                (med.rejeter === false) ?
                                                    (<TableRow key={med.id}>
                                                        <TableCell component="th" scope="row">{med.id}</TableCell>
                                                        <TableCell align="center">{med.nom}</TableCell>
                                                        <TableCell align="center">{med.prenom}</TableCell>
                                                        <TableCell align="center">{med.email}</TableCell>
                                                        <TableCell align="center">{med.specialite.libelle}</TableCell>
                                                        <TableCell align="center">{med.conact}</TableCell>
                                                        <TableCell align="center">{med.contactUrgence}</TableCell>
                                                        <TableCell align="center">{med.ville.ville}</TableCell>
                                                        <TableCell align="center">{med.adresse}</TableCell>
                                                        <TableCell align="center">{med.presentation}</TableCell>
                                                        {/* <TableCell align="center">{(med.valider) ? <CheckCircle /> : <HighlightOff />}</TableCell> */}
                                                        <TableCell align="center">  <DeleteProvider id={med.id} /> </TableCell>
                                                        <TableCell align="center">  <EditProvider med={med} /> </TableCell>
                                                        {/* <TableCell align="center">{(med.rejeter===true)?  <Accepterprovider id={med.id}/>:<Rejeterprovider id={med.id}/>  }</TableCell> */}
                                                    </TableRow>)
                                                    : ('')
                                            )}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            )

                                :
                                (<div align='center'>
                                    <CircularProgress />
                                </div>)
                        }
                    </Grid>
                </Grid>




            </div>
  )
}
