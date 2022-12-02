import React, { Component } from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, Radio, Typography, Grid, TextField, CssBaseline, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, MenuItem, InputLabel, Select, Box, CircularProgress } from '@mui/material';
import axios from 'axios'

import * as yup from 'yup'
import { createTheme ,ThemeProvider} from '@mui/material/styles';

import moment from 'moment';
import { Formik, useFormik } from 'formik';
import { Add } from '@mui/icons-material';



const theme = createTheme();

export default function AddClient() {
    const [formData, setformData] = React.useState()
    const [isLoading, setLoading] = React.useState(true);
    const [citys, setCitys] = React.useState();
    const [minDate, setMinDate] = React.useState(moment(new Date()))
    const [open, setOpen]= React.useState(false)
  
    async function signup() {
      try {
        const response = await axios.post('http://localhost:8088/client/signup', formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  
  
  
  
  
    React.useEffect(() => {
  
      async function getCity() {
        try {
          const response = await axios.get('http://localhost:8088/city/getAllCity');
          console.log(response);
          setCitys(response.data);
          console.log("ccccc", citys);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
  
    //   getSpeciality = () => {
    //     axios
    //         .get("http://localhost:8088/speciality/getAllSpeciality")
    //         .then(data => {
    //             this.setState({ specialitys: data.data })
    //             console.log(data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             return null;
    //         });
    // };
  
  
  
  
  
      getCity();
      console.log("city", citys)
      console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
    }, [isLoading]);
  
  
    const minnDate = moment(new Date()).subtract(18, 'years')._d
    console.log("minnDate", minnDate)
  
    const validationSchema = yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Enter a valid email").required("Email is required"),
      street: yup.string().required("street is required"),
      phone: yup.number()
        .typeError(' phone est invalide')
        .required('phone is required')
        .max(99999999, 'Saisir 8 chiffres')
        .min(10000000, 'Saisir 8 chiffres'),
      password: yup.string()
        .required('password is required')
        .min(8, 'il faut plus que 8 caractére'),
      cPassword: yup.string()
        .required('password is required')
        .oneOf([yup.ref('password'), null], 'mote de passe incorrecte'),
      birthday: yup.date()
        .max(minnDate, "Il faut avoir 18 ans minimum")
        .required('Obligatoire'),
  
    })
    const Formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPassword: "",
        street: "",
        phone: "",
        city: 1,
        birthday: moment(minDate).subtract(18, 'years').format("YYYY-MM-DD")
      },
      onSubmit: (values) => {
        console.log("subbbb", values)
        setformData({
          email: values.email,
          passowrd: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          street: values.street,
          birthday: values.birthday,
          city:
          {
            idCity: values.city
          }
        })
        signup();
      },
      validationSchema: validationSchema
  
  
  
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
      }
    

    return (
        <div>
            <Button variant="text" color="primary" onClick={handleClickOpen}> Add Client
                <Add />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Client</DialogTitle>
                <DialogContent>
                <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                           
                                <Box sx={{ mt: 3 }}>
                                    <form onSubmit={(e) => { e.preventDefault(); Formik.handleSubmit(e) }} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="firstName"

                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                    value={Formik.values.firstName}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.firstName && Boolean(Formik.errors.firstName)}
                                                    helperText={Formik.touched.firstName && Formik.errors.firstName}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                    value={Formik.values.lastName}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.lastName && Boolean(Formik.errors.lastName)}
                                                    helperText={Formik.touched.lastName && Formik.errors.lastName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField

                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={Formik.values.email}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.email && Boolean(Formik.errors.email)}
                                                    helperText={Formik.touched.email && Formik.errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField

                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    value={Formik.values.password}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.password && Boolean(Formik.errors.password)}
                                                    helperText={Formik.touched.password && Formik.errors.password}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField

                                                    fullWidth
                                                    name="cPassword"
                                                    label="cPassword"
                                                    type="password"
                                                    id="cPassword"
                                                    autoComplete="new-cPassword"
                                                    value={Formik.values.cPassword}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.cPassword && Boolean(Formik.errors.cPassword)}
                                                    helperText={Formik.touched.cPassword && Formik.errors.cPassword}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField

                                                    fullWidth
                                                    name="phone"
                                                    label="phone"
                                                    type="text"
                                                    id="phone"
                                                    autoComplete="phone"
                                                    value={Formik.values.phone}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.phone && Boolean(Formik.errors.phone)}
                                                    helperText={Formik.touched.phone && Formik.errors.phone}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField

                                                    fullWidth
                                                    name="street"
                                                    label="street"
                                                    type="text"
                                                    id="street"
                                                    autoComplete="street"
                                                    value={Formik.values.street}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.street && Boolean(Formik.errors.street)}
                                                    helperText={Formik.touched.street && Formik.errors.street}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">city</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="city"
                                                        name="city"
                                                        value={Formik.values.city}
                                                        onChange={Formik.handleChange}
                                                    // id="city"

                                                    // onChange={handleChange}
                                                    >
                                                        {citys.map(items =>
                                                            <MenuItem key={items.idCity} value={items.idCity}>{items.label}</MenuItem>
                                                        )}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="date"
                                                    name="birthday"
                                                    label="birthday"
                                                    type="date"
                                                    value={Formik.values.birthday}
                                                    onBlur={Formik.handleBlur}
                                                    onChange={Formik.handleChange}
                                                    error={Formik.touched.birthday && Boolean(Formik.errors.birthday)}
                                                    helperText={Formik.touched.birthday && Formik.errors.birthday}
                                                // defaultValue={moment(minDate).subtract(18, 'years').format("YYYY-MM-DD")}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign Up
                                        </Button>
                                        {/* <GoogleLogin
                                            clientId="109524746643-mf2lf4u0s5a8vbtdl8d2ffbp41aa9b19.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        /> */}
                                        
                                    </form>
                                </Box>
                        </Container>
                    </ThemeProvider>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}

