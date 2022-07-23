import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../style.css'; 
import Home from './Home.jsx';
import Car from './Car.jsx';
import Bike from './Bike.jsx';
import Chart from './Dashboard.jsx';


const CarbonOptions = ({ setPosts, newPost, setNewPost }) => {

  const [compareValue, setComparison] = React.useState('');
  const [carCarbon, setCarCarbon] = React.useState(0);
  const [bikeCarbon, setBikeCarbon] = React.useState(0);
  const [homeCarbon, setHomeCarbon] = React.useState(0);
  // Sets state with comparison option
  const handleChange = (event, newCompare) => {
    setComparison(newCompare);
  };

  const renderBox = () => {
    if (compareValue === "car"){
      return (
        <Car setCarCarbon={setCarCarbon} newPost={newPost} setNewPost={setNewPost} />
      )
    }

    if (compareValue === "bike"){
      return (
        <Bike setBikeCarbon={setBikeCarbon} newPost={newPost} setNewPost={setNewPost} />
      )
    }

    if (compareValue === "home"){
      return (
        <Home setHomeCarbon={setHomeCarbon} newPost={newPost} setNewPost={setNewPost} />
      )
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Chart carCarbon={carCarbon} homeCarbon={homeCarbon} bikeCarbon={bikeCarbon} />
      <br/>
      <br/>
      <div id='carbonOptions'>
        <h3 id-="carbonh1"> Compare Your Carbon Footprint </h3>
        <div id='toggleGroup'>
          <ToggleButtonGroup
          color="primary"
          sx={{background: "lightgrey"}}
          value={compareValue}
          exclusive
          onChange={handleChange}
          >
            <ToggleButton value="car">Car</ToggleButton>
            <ToggleButton value="bike" >Motor Bike</ToggleButton>
            <ToggleButton value="home" >Home</ToggleButton>
          </ToggleButtonGroup>
        {renderBox()}
        </div>
      </div>
    </div>
  );
}


export default CarbonOptions;