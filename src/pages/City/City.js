
import React from "react";
import axios from "axios";
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";

import AddCity from "./AddCity";
import DeleteCity from "./DeleteCity";
import EditCity from "./EditCity";
import { withRouter } from "react-router";




class Ville extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ville: '',
            api: false
        };
    }

    componentDidMount() {
        this.getVille();

    }
    getVille = () => {

        axios
            .get("http://localhost:8088/provider/city/getAllCity")
            .then(data => {
                if (data.data.length !== 0) {
                    this.setState({ ville: data.data })
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
        if (this.state.ville) {
            this.setState({ api: true })
        }
    };
    render() {
        console.log(this.state)
        const { classes } = this.props;

        return (
            <div style={{ width: "100%" }}>
                <div align='right' >
                    <AddCity />
                </div>
                {(this.state.api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                ) :
                    (this.state.ville) ? (
                        <TableContainer >
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Libelle</TableCell>
                                        {/* <TableCell align="right">Supprimer</TableCell> */}
                                        <TableCell align="right">Modifier</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {this.state.ville.map(vil =>
                                        <TableRow key={vil.idCity}>
                                            <TableCell component="th" scope="row">{vil.idCity}</TableCell>
                                            <TableCell align="right">{vil.label}</TableCell>
                                            {/* <TableCell align="right">  <DeleteCity id={vil.id} libelle={vil.ville}/> </TableCell> */}
                                            <TableCell align="right">  <EditCity id={vil.idCity} libelle={vil.label} /> </TableCell>
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
export default (Ville)