import React, { useEffect, useState } from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Grid } from "@mui/material";
import AddProvider from './AddProvider';
import DeleteProvider from './DeleteProvider';
import EditProvider from './EditProvider';
import axios from 'axios';




export default function Provider() {
    const [providers, setProviders]=useState();
    const [providersR, setProvidersR]=useState();
    const [api, setApi]=useState();


    useEffect(() => {

        async function getProvider() {
          try {
            const response = await axios.get('http://localhost:8088/provider/getAllProvider');
            console.log(response);
            setProviders(response.data);
            console.log("ccccc", providers);
            // setLoading(false);
          } catch (error) {
            console.error(error);
          }
        }
        getProvider();
        console.log("provider", providers)
        // console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
      }, []);

  return (
    <div style={{ width: "100%" }}>
                {/* <div align='right' >
                    <AddProvider />
                </div> */}
                <Grid spacing={2} container>
                    <Grid item xs={12} >
                        <Typography variant='h6'> Providers</Typography>
                    </Grid>
                    <Grid item>
                        {
                        // (api == true) ? (
                        //     <div align='center'>
                        //         <Typography variant='h6'>Vide</Typography>
                        //     </div>
                        //     ) :
                            (providers) ? (
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {providers.map(prov =>
                                                
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
                    
                </Grid>




            </div>
  )
}
