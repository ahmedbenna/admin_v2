import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Nav from './comp/Nav';
import { CssBaseline, Paper } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Driver from './pages/driver/Driver';
import Speciality from './pages/Specialite/Speciality';
import Client from './pages/Client/Client';
import Publication from './pages/City/Publication';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// export const CityContext = useContext();

function App() {

  // const [citys, setCitys]=useState();

  // useEffect(() => {

  //   async function getCity() {
  //     try {
  //       const response = await axios.get('http://localhost:8088/city/getAllCity');
  //       console.log(response);
  //       setCitys(response.data);
  //       console.log("ccccc", citys);
  //       // setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCity();
  //   console.log("city", citys)
  //   // console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
  // }, []);
  
  return (
    <>
      <CssBaseline />
      {/* <CityContext.driver value={citys}> */}
      <Router>
          <div style={{ display: 'flex' }}>
            <Nav />
            <div style={{ paddingTop: '80px ', margin: 'auto', width: '100%' }}>
              <Paper style={{ backgroundColor: '#FFFFFF', display: "flex", minHeight: '500px', justifyContent: "center", margin: '20px', }}>

                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/driver" element={<Driver />} />
                  <Route exact path="/client" element={<Client />} />
                  <Route exact path="/city" element={<Publication />} />
                  <Route exact path="/Speciality" element={<Speciality />} />
                </Routes>
              </Paper>
            </div>
          </div>
        </Router>
      {/* </CityContext.driver> */}
    </>

  );
}

export default App;
