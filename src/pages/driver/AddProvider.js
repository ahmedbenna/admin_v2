import React, { Component } from 'react'

import { FormControl, TextareaAutosize, MenuItem, Select, InputLabel, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, CircularProgress } from '@mui/material'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles';


import * as Yup from 'yup'

import { useFormik } from 'formik';
import { Add } from '@mui/icons-material';
import moment from 'moment';


const theme = createTheme();

export default function AddProvider() {

  const [formData, setformData] = React.useState()
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [citys, setCitys] = React.useState();
  const [specialitys, setSpeciality] = React.useState();
  const [minDate, setMinDate] = React.useState(moment(new Date()))
  const minnDate = moment(new Date()).subtract(18, 'years')._d
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function signup() {
    try {
      const response = await axios.post('http://localhost:8088/driver/signup', formData);
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

    async function getSpeciality() {
      axios
        .get("http://localhost:8088/speciality/getAllSpeciality")
        .then(data => {
          setSpeciality(data.data)
          console.log(data)
        })
        .catch(err => {
          console.log(err);
          return null;
        });
    };




    getSpeciality();
    getCity();
    console.log("city", citys)
    console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
  }, [isLoading]);

  const validationSchema = Yup.object({
    nom: Yup.string()
      .required('Obligatoire'),
    prenom: Yup.string()
      .required('Obligatoire'),
    email: Yup.string()
      .required('Obligatoire')
      .email('Invalid email'),
    password: Yup.string()
      .required('Obligatoire')
      .min(8, 'il faut plus que 8 caractére'),
    cPassword: Yup.string()
      .required('Obligatoire')
      .oneOf([Yup.ref('password'), null], 'mote de passe incorrecte'),
    phone: Yup.number()
      .typeError(' Numero est invalide')
      .required('Obligatoire')
      .max(99999999, 'Numero invalide')
      .min(10000000, 'Numero invalide'),
    street: Yup.string()
      .required('Obligatoire'),
    // presentation: Yup.string()
    //     .required('Obligatoire'),
    birthday: Yup.date()
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
      speciality: 1,
      city: 1,
      birthday: moment(minDate).subtract(18, 'years').format("YYYY-MM-DD")
    },
    onSubmit: (values) => {
      // setTimeout(() => {

      console.log("subbbb", values)
      alert(JSON.stringify(values, null, 2));

      setformData({
        email: values.email,
        passowrd: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        street: values.street,
        city:
        {
          idCity: values.city
        },
        speciality: {
          idSpeciality: values.speciality
        }

      });
      signup();

      try {
        const response = axios.post('http://localhost:8088/driver/signup', formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }

      // }, 400);

    },
    validationSchema: validationSchema



  })
  const responseGoogle = (response) => {
    console.log(response);
  }


  if (isLoading) {

    return <div className="App"><CircularProgress /></div>;
  }



  return (
    <ThemeProvider theme={theme}>

      <div>
        <Button variant="text" color="primary" onClick={handleClickOpen}> Add driver
          <Add />
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add driver</DialogTitle>
          <DialogContent>

            <form onSubmit={Formik.handleSubmit} >
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">city</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="speciality"
                      name="speciality"
                      value={Formik.values.speciality}
                      onChange={Formik.handleChange}
                    // id="speciality"

                    // onChange={handleChange}
                    >
                      {specialitys.map(items =>
                        <MenuItem key={items.idSpeciality} value={items.idSpeciality}>{items.label}</MenuItem>
                      )}

                    </Select>
                  </FormControl>
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
                    <InputLabel id="demo-simple-select-label">Speciality</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Speciality"
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
                onClick={Formik.handleSubmit}
              >
                add
              </Button>
              {/* <GoogleLogin
                            clientId="109524746643-mf2lf4u0s5a8vbtdl8d2ffbp41aa9b19.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}

            </form>

          </DialogContent>

          <DialogActions>
            {/* <Button onClick={this.handleSubmit}>Ajouter</Button> */}

            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </div >
    </ThemeProvider>
  )

}
