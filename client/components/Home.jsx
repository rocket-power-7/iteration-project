import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Home = ( { setHomeCarbon } ) => {

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
          console.log(data)
          let value = String(data).split(" ")
          console.log(value)
          setHomeCarbon(value[0])
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    }
  
    return (
      <div>
        <Box
          component="form"
          sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
          noValidate
          autoComplete="off" >
          <h1>Carbon Footprint Comparison: Home Energy</h1>
          <TextField 
          id="outlined-basic" 
          label="Required" 
          variant="outlined" 
          helperText="Please input your weekly driving distance in kilometers"
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
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Stack>
      </div>
    );
}


export default Home;