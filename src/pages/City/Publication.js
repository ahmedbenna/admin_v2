
import React from "react";
import axios from "axios";
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";

import AddCity from "./AddCity";
import DeleteCity from "./DeleteCity";
import EditCity from "./EditCity";
import { withRouter } from "react-router";




class Publication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            api: false
        };
    }

    componentDidMount() {
        this.getCity();

    }
    getCity = () => {

        axios
            .get("http://localhost:8088/api/publication/")
            .then(data => {
                if (data.data.length !== 0) {
                    this.setState({ city: data.data })
                    console.log("ente")
                }
                else {
                    this.setState({ api: true })
                }
                console.log(data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("admin")
                    window.location = '/'
                }
                console.log(err);
            });
        if (this.state.city) {
            this.setState({ api: true })
        }
    };
    render() {
        console.log(this.state)
        const { classes } = this.props;

        return (
            <div style={{ width: "100%" }}>
                <div align='right' >
                    {/* <AddCity /> */}
                </div>
                {(this.state.api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                ) :
                    (this.state.city) ? (
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Id Driver</TableCell>
                                        <TableCell align="right">From</TableCell>
                                        <TableCell align="right">Destination</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">seats</TableCell>
                                        <TableCell align="right">price</TableCell>
                                        <TableCell align="right">description</TableCell>


                                        {/* <TableCell align="right">Supprimer</TableCell> */}
                                        <TableCell align="right">Modifier</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {this.state.city.map(cit =>
                                        <TableRow key={cit.idCity}>
                                            <TableCell component="th" scope="row">{cit.id}</TableCell>
                                            <TableCell align="right">{cit.conducteur.id}</TableCell>
                                            <TableCell align="right">{cit.lieuDepart}</TableCell>
                                            <TableCell align="right">{cit.lieuArrive}</TableCell>
                                            <TableCell align="right">{cit.dateDepart}</TableCell>
                                            <TableCell align="right">{cit.nbrePlace}</TableCell>
                                            <TableCell align="right">{cit.prix}</TableCell>
                                            <TableCell align="right">{cit.description}</TableCell>

                                            <TableCell align="right">  <DeleteCity id={cit.id} /> </TableCell>
                                            {/* <TableCell align="right">  <EditCity city={cit} /> </TableCell> */}
                                            {/* <TableCell align="right">{row.protein}</TableCell>  */}
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
}
export default (Publication)