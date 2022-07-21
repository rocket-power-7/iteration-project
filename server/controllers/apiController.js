require("dotenv").config();
const fetch = require('node-fetch');

const apiController = {};

apiController.carStat = (req, res, next) => {

  const { mileValue, carType } = req.body;
  const data = { 'distance': mileValue, 'vehicle': carType };

  fetch('https://app.trycarbonapi.com/api/carTravel', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    res.locals.carInfo = data.carbon
    next();
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}


apiController.bikeStat = (req, res, next) => {

  const { mileValue, bikeType } = req.body;
  const data = { 'distance': mileValue, 'type': bikeType };

  fetch('https://app.trycarbonapi.com/api/motorBike', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    res.locals.bikeInfo = data.carbon
    next();
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

apiController.homeStat = (req, res, next) => {

  const { KWH, country } = req.body;
  const data = { 'consumption': KWH, 'location': country };


  fetch('https://app.trycarbonapi.com/api/traditionalHydro', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    res.locals.homeInfo = data.carbon
    next();
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

module.exports = apiController;