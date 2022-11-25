import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import AddSpeciality from './AddSpeciality'
import EditSpeciality from './EditSpeciality'

export default function Speciality() {
  return (
    <div style={{ width: "100%" }}>
                <div align='right' >
                    <AddSpeciality />

                </div>
                {(this.state.api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                ) :
                    (this.state.specialites) ? (

                        <TableContainer >
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">label</TableCell>
                                        {/* <TableCell align="right">Supprimer</TableCell> */}
                                        <TableCell align="right">Modifier</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.specialites.map(spec =>
                                        <TableRow key={spec.idSpeciality}>
                                            <TableCell component="th" scope="row">{spec.idSpeciality}</TableCell>
                                            <TableCell align="right">{spec.label}</TableCell>
                                            {/* <TableCell align="right">  <SupprimeSpecialite id={spec.id} libelle={spec.libelle}/> </TableCell> */}
                                            <TableCell align="right">  <EditSpeciality id={spec.idSpeciality} libelle={spec.label} /> </TableCell>
                                            {/* <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
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
            </div>
  )
}
