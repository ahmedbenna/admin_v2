import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddSpeciality from './AddSpeciality'
import EditSpeciality from './EditSpeciality'

export default function Speciality() {
    
  const [Specialitys, setSpeciality]=useState();
  const [api, setApi]=useState();


  useEffect(() => {

    async function getCity() {
      try {
        const response = await axios.get('http://localhost:8088/speciality/getAllSpeciality');
        console.log(response);
        setSpeciality(response.data);
        console.log("ccccc", Specialitys);
        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getCity();
    console.log("city", Specialitys)
    // console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
  }, []);
  return (
    <div style={{ width: "100%" }}>
                <div align='right' >
                    <AddSpeciality />

                </div>
                {(api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                ) :
                    (Specialitys) ? (

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
                                    {Specialitys.map(spec =>
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
