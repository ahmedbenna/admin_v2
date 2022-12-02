
import React from "react";
import axios from "axios";
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';

import AccepterMedecin from "./AcceptProvider";
import RejeterMedecin from "./RejecteProvider";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';





const styles = {

}

// const rows= [
//     { id: 1, col1: "Hello", col2: "World" },
//     { id: 2, col1: "XGrid", col2: "is Awesome" },
//     { id: 3, col1: "Material-UI", col2: "is Amazing" },
//     { id: 4, col1: "Hello", col2: "World" },
//     { id: 5, col1: "XGrid", col2: "is Awesome" },
//     { id: 6, col1: "Material-UI", col2: "is Amazing" }
//   ];

const columns = [
    // { field: "id", hide: true },
    { field: "id", headerName: "Id", width: 150 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "prenom", headerName: "Prenom", width: 150 },

];
class Demandes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            medecin: '',
            api: false
        };
    }

    componentDidMount() {
        this.getMedecins();

    }
    getMedecins = () => {
        // const config = {
        //     headers: { 
        //         Authorization : 'Bearer ' + localStorage.getItem('admin')
        //     }
        // }
        axios
            .get("http://localhost:8088/")
            .then(data => {
                if (data.data.length !== 0) {
                    this.setState({ medecin: data.data })
                    console.log(data)
                }
                else {
                    this.setState({ api: true })
                }
            })
            .catch(err => {
                if(err.response.status == 401){
                    localStorage.removeItem("token")
                    localStorage.removeItem("admin")
                    window.location = '/'

                }
                console.log(err);
            });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.medecin != prevState.medecin) {
            this.setState()
        }
    }

    render() {
        console.log(this.state)
        const { classes } = this.props;


        return (
            <div>
                {(this.state.api == true) ? (
                    <div align='center'>
                        <Typography variant='h6'>Vide</Typography>
                    </div>
                ) :
                    (this.state.medecin) ? (
                        <div>
                            <TableContainer >
                                <Table size='small' className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Id</TableCell>
                                            <TableCell align="center">Nom</TableCell>
                                            <TableCell align="center">Prénom</TableCell>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">Spécialité</TableCell>
                                            <TableCell align="center">Contact</TableCell>
                                            <TableCell align="center">Contact urgence</TableCell>
                                            <TableCell align="center">Ville</TableCell>
                                            <TableCell align="center">Adresse</TableCell>
                                            <TableCell align="center">Présentation</TableCell>
                                            <TableCell align="center">Valider</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {this.state.medecin.map(med =>
                                            <TableRow key={med.id}>
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
                                                <TableCell align="center">{<> <AccepterMedecin id={med.id} /> <RejeterMedecin id={med.id} /> </>}</TableCell>
                                            </TableRow>
                                        )
                                        }




                                    </TableBody>

                                </Table>
                            </TableContainer>
                            {/* <DataGrid rows={this.state.medecin} columns={columns} /> */}
                        </div>
                    ) : 
                    (<div align='center'>
                        <CircularProgress />
                    </div>)
                }


            </div>
        );
    }
}
export default withStyles(styles)(Demandes)