import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import myLogo from '../../logo3.png';
import { Outlet } from "react-router-dom";
import SignUp from './Signup.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ButtonAppBar({ loggedIn, setLoggedIn }) {

  const handleClick = () => {

    axios.get('./api/user/logout')
      .then((res) => {
        setLoggedIn(false)
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

    if(loggedIn) {
        return (
            <div>
            <Box sx={{ flexGrow: 1 }} >
              <AppBar sx={{background: "linear-gradient(to right bottom, #3ce666, #1957c2)", borderRadius: 1}} position="static">
                <Toolbar >
                <img src={myLogo} alt="logo" height= "40px" style={{marginLeft: "20px"}} />
                  <Typography variant="h5" sx={{ flexGrow: 1, marginLeft: 2, marginTop: 0.5, fontFamily: "Helvetica" ,color: "linear-gradient(to right bottom, #3ce666, #1957c2)"}}>
                    NO PLANET B
                  </Typography>
                  <Button color="inherit" sx={{marginRight: 4}} component={Link} to='/' onClick={handleClick}>Logout</Button>
                </Toolbar>
              </AppBar>
            </Box>
            <Outlet />
            </div>
          );
    }

  return (
    <div>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar sx={{background: "linear-gradient(to right bottom, #3ce666, #1957c2)", borderRadius: 1}} position="static">
        <Toolbar >
        <img src={myLogo} alt="logo" height= "40px" style={{marginLeft: "20px"}} />
          <Typography variant="h5"  sx={{ flexGrow: 1, marginLeft: 2, marginTop: 0.5, fontFamily: "Helvetica" ,color: "linear-gradient(to right bottom, #3ce666, #1957c2)"}}>
            NO PLANET B
          </Typography>
          <Button color="inherit" sx={{marginRight: 4}} component={Link} to='/Login'>Login</Button>
          <Button color="inherit" sx={{marginRight: 4}} component={Link} to='/Signup' >Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
    </div>
  );
}