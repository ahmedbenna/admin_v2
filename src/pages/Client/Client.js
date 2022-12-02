import React, { useEffect, useState } from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Grid } from "@mui/material";
import AddClient from './AddClient';
import DeleteClient from './DeleteClient';
import EditClient from './EditClient';
import axios from 'axios';
import moment from 'moment';




export default function Cient() {
    const [clients, setClients]=useState();
    // const [ClientsR, setClientsR]=useState();
    const [api, setApi]=useState();

    useEffect(() => {

        async function getClient() {
          try {
            const response = await axios.get('http://localhost:8088/client/getAllClient');
            console.log(response);
            setClients(response.data);
            console.log("ccccc", clients);
            // setLoading(false);
          } catch (error) {
            console.error(error);
          }
        }
        getClient();
        console.log("clients", clients)
        // console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
      }, []);
        return (
            <div style={{ width: "100%" }}>
                <div align='right' >
                    <AddClient />
                </div>
                {(api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                    ) :
                    (clients) ? (
                        <TableContainer >
                            <Table size='small'  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell size='small' align="center">Id</TableCell>
                                                <TableCell size='small' align="center">firstName</TableCell>
                                                <TableCell align="center">lastName</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                {/* <TableCell align="center">speciality</TableCell> */}
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
                                    {clients.map(c =>
                                        <TableRow key={c.id}>
                                          <TableCell component="th" scope="row">{c.id}</TableCell>
                                                        <TableCell align="center">{c.firstName}</TableCell>
                                                        <TableCell align="center">{c.lastName}</TableCell>
                                                        <TableCell align="center">{c.email}</TableCell>
                                                        {/* <TableCell align="center">{c.speciality.label}</TableCell> */}
                                                        <TableCell align="center">{c.phone}</TableCell>
                                                        <TableCell align="center">{c.birthday}</TableCell>
                                                        <TableCell align="center">{c.city.label}</TableCell>
                                                        <TableCell align="center">{c.street}</TableCell>
                                                        {/* <TableCell align="center">{c.presentation}</TableCell> */}
                                                        {/* <TableCell align="center">{(c.valider) ? <CheckCircle /> : <HighlightOff />}</TableCell> */}
                                                        <TableCell align="center">  <DeleteClient c={c} /> </TableCell>
                                                        {/* <TableCell align="center">  <EditClient c={c} /> </TableCell> */}


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
        );
    }

