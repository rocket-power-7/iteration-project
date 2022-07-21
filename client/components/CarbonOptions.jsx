import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../style.css'; 
import Home from './Home.jsx';
import Car from './Car.jsx';
import Bike from './Bike.jsx';
import Chart from './Dashboard.jsx';


const CarbonOptions = () => {

  const [compareValue, setComparison] = React.useState('');
  const [carCarbon, setCarCarbon] = React.useState(0);
  const [bikeCarbon, setBikeCarbon] = React.useState(0);
  const [homeCarbon, setHomeCarbon] = React.useState(0);
  // Sets state with comparison option
  const handleChange = (event, newCompare) => {
    setComparison(newCompare);
  };

  const renderBox = () => {
    if (compareValue == "car"){
      return (
        <Car setCarCarbon={setCarCarbon}/>

      )
    }

    if (compareValue == "bike"){
      return (
        <Bike setBikeCarbon={setBikeCarbon}/>
      )
    }

    if (compareValue == "home"){
      return (
        <Home setHomeCarbon={setHomeCarbon}/>
      )
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Chart carCarbon={carCarbon} homeCarbon={homeCarbon} bikeCarbon={bikeCarbon} />
      <div style={{marginTop: "10px"}}>
      <ToggleButtonGroup
      color="primary"
      value={compareValue}
      exclusive
      onChange={handleChange}
      sx={{background: "red"}}
      >
        <ToggleButton value="car">Car Travel</ToggleButton>
        <ToggleButton value="bike" >Motor Bike</ToggleButton>
        <ToggleButton value="home" >Home Energy</ToggleButton>
      </ToggleButtonGroup>
      {renderBox()}
      </div>
    </div>
  );
}


export default CarbonOptions;