import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Bike = ( {setBikeCarbon} ) => {

  const bikeOptions = [
    {
      value: 'SmallMotorBike',
      label: 'Small Motor Bike'
    },
    {
      value: 'MediumMotorBike',
      label: 'Medium Motor Bike'
    },
    {
      value: 'LargeMotorBike',
      label: 'Large Motor Bike'
    }
  ]

  const [mileValue, setMileValue] = React.useState('');
  const [bikeType, setBikeType] = React.useState('');

  const handleChange1 = (event) => {
    setMileValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setBikeType(event.target.value);
  };

  // Function that will route to /home in server
  const handleSubmit = () => {
  
    const data = { mileValue, bikeType };

    //fetch -- POST to backend
    fetch('/api/stats/bike', {
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
        setBikeCarbon(value[0])
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
        autoComplete="off"
      >
        <h1>Carbon Footprint Comparison: Motor Bike</h1>
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
        value={bikeType}
        onChange={handleChange2}
        helperText="Please select your motor bike type"
        placeholder='motor bike type'
        >
          {bikeOptions.map((option) => (
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


export default Bike;