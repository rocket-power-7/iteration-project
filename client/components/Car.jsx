import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Car = ( { setCarCarbon } ) => {

  const carOptions = [
    {
      value: 'SmallDieselCar',
      label: 'Small Diesel Car'
    },
    {
      value: 'MediumDieselCar',
      label: 'Medium Diesel Car'
    },
    {
      value: 'LargeDieselCar',
      label: 'Large Diesel Car'
    },
    {
      value: 'MediumHybridCar',
      label: 'Medium Hybrid Car'
    },
    {
      value: 'LargeHybridCar',
      label: 'Large Hybrid Car'
    },
    {
      value: 'MediumLPGCar',
      label: 'Medium LPG Car'
    },
    {
      value: 'LargeLPGCar',
      label: 'Large LPG Car'
    },
    {
      value: 'SmallPetrolVan',
      label: 'Small Petrol Van'
    },
    {
      value: 'LargePetrolVan',
      label: 'Large Petrol Van'
    },
    {
      value: 'SmallDielselVan',
      label: 'Small Diesel Van'
    },
    {
      value: 'MediumDielselVan',
      label: 'Medium Diesel Van'
    },
    {
      value: 'LargeDielselVan',
      label: 'Large Diesel Van'
    },
    {
      value: 'SmallPetrolCar',
      label: 'Small Petrol Car'
    },
    {
      value: 'MediumPetrolCar',
      label: 'Medium Petrol Car'
    },
    {
      value: 'LargePetrolCar',
      label: 'Large Petrol Car'
    }
  ]

  // Sets state with inputed car type and # miles weekly
  const [carType, setCarType] = React.useState('');
  const [mileValue, setMileValue] = React.useState('');

  // Function that handles onChange event (as you type)
  const handleChange1 = (event) => {
    setMileValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setCarType(event.target.value);
  }

  // Function that will route to /car in server
  const handleSubmit = (event) => {
    
    // Prevents re-rendering of page
    event.preventDefault();
    const data = { mileValue, carType };

    //fetch -- POST to backend
    fetch('/api/stats/car', {
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
        setCarCarbon(value[0])
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
        <h1>Carbon Footprint Comparison: Car</h1>
        <TextField 
        id="outlined-basic" 
        label="Required" 
        variant="outlined" 
        helperText="Please input your weekly driving distance in kilometers"
        value={mileValue}
        onChange={handleChange1}
        placeholder='weekly mileage (km)'/>
        
        </Box>
        <TextField
        id="outlined-select-currency"
        select
        label="Select"
        value={carType}
        onChange={handleChange2}
        helperText="Please select your vehicle"
        placeholder='vehicle type'
        >
          {carOptions.map((option) => (
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


export default Car;