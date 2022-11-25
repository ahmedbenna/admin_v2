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
import Provider from './pages/Provider/Provider';
import Speciality from './pages/Specialite/Speciality';
import Client from './pages/Client/Client';
import City from './pages/City/City';

function App() {
  return (
    <>
      <CssBaseline />

      <Router>
        <div style={{ display: 'flex' }}>
          <Nav />
          <div style={{ paddingTop: '80px ', margin: 'auto', width: '100%' }}>
            <Paper style={{ backgroundColor: '#FFFFFF', display: "flex", minHeight: '500px', justifyContent: "center", margin: '20px', }}>

              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/provider" element={<Provider/>} />
                <Route exact path="/client" element={<Client/>} />
                <Route exact path="/city" element={<City />} />
                <Route exact path="/speciality" element={<Speciality />} />
              </Routes>
            </Paper>
          </div>
        </div>
      </Router>
    </>

  );
}

export default App;
