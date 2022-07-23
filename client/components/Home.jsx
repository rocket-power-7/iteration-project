import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SharePopUp from './SharePopUp.jsx';

const Home = ( { setHomeCarbon, newPost, setNewPost } ) => {

  const countryOptions = [
    {
      value: 'USA',
      label: 'USA'
    },
    {
      value: 'Canada',
      label: 'Canada'
    },
    {
      value: 'UK',
      label: 'UK'
    },
    {
      value: 'Europe',
      label: 'Europe'
    },
    {
      value: 'Africa',
      label: 'Africa'
    },
    {
      value: 'LatinAmerica',
      label: 'Latin America'
    },
    {
      value: 'MiddleEast',
      label: 'Middle East'
    }
  ]

    // Sets state with inputed car type and # miles weekly
    const [KWH, setKWH] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [carbon, setCarbon] = React.useState();
    const [message, setMessage] = React.useState();
  
    // Function that handles onChange event (as you type)
    const handleChange1 = (event) => {
      setKWH(event.target.value);
    };
  
    const handleChange2 = (event) => {
      setCountry(event.target.value);
    }
  
    // Function that will route to /home in server
    const handleSubmit = () => {
      
      const data = { KWH, country };

      //fetch -- POST to backend
      fetch('/api/stats/home', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          let value = String(data).split(" ")
          console.log(value)
          setCarbon(value[0])
          setHomeCarbon(value[0])
          // add average here
          const average = 710.3
          const percentage = (((average-value[0])/average)*100).toFixed(1)
          setMessage(`My home's carbon emissions are ${percentage}% more sustainable than the average! Learn from me!`)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    }

    const popUp = () => {
      // add average here
      if(carbon < 710.3) {
        return <SharePopUp carbon = {carbon} message={message} newPost={newPost} setNewPost={setNewPost} />
      }
    }
  
    return (
      <div class='parentForm'>
      <div class='compareBox'>
        <Box
          component="form"
          noValidate
          autoComplete="off" >
          <h1 class='h1Compare'>Home Energy</h1>
          <br/>
          <TextField 
          id="outlined-basic" 
          label="Required" 
          variant="outlined" 
          helperText="Please input your monthly KWH usage"
          value={KWH}
          onChange={handleChange1}
          placeholder='monthly KWH'/>
          
          </Box>
          <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={country}
          onChange={handleChange2}
          helperText="Please select your country"
          placeholder='vehicle type'
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} justifyContent='center'>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Stack>
      </div>
      <div className='popup'>
      {popUp()}
      </div>
      </div>
    );
}


export default Home;