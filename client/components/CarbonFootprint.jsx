import React from 'react';
import '../style.css'; //test this
import { Link } from 'react-router-dom';
import CarbonOptions from './CarbonOptions.jsx';
import Chart from './Dashboard.jsx';

const CarbonFootprint = () => {

  return (
    <div className='dashboard2'>
      {/* add Dashboard here */}
      <CarbonOptions />
      {/* add Social posts here */}
    </div>
  )
}

export default CarbonFootprint;