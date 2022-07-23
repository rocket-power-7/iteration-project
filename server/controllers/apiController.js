require("dotenv").config();
const fetch = require('node-fetch');
const db = require('../db');

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
    res.locals.carInfo = data.carbon;
    next();
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

apiController.DB = (req, res, next) => {

  // AVERAGES
  function findPercent(data, type) {
      let average; 
      if (type == 'car') average = 88.46;
      if (type == 'bike') average = 38.59;
      if (type == 'home') average = 710.30;

      let newData = parseInt(data);
      if(newData > average) {
        const percentage = Math.round(((newData-average)/average)*100)
        return percentage;
    } else {
        const percentage = Math.round(((average-newData)/average)*100)
        return percentage;
    } 
  }

  function decimal(string){
    let value = string.split(" ");
    return +value[0];
  } 

  // CONDITIONAL to find comparison type
  if (res.locals.carInfo) {
    const metric = decimal(res.locals.carInfo);
    const percent = findPercent(metric, 'car');
    const fk_user_id = res.locals.userData.pk_user_id;

    //QUERY
    const values = [ metric, percent, fk_user_id ];

    const query = 
    'INSERT INTO car_stats (car_metric, car_percent, car_created_at, fk_user_id)' + 'VALUES ($1, $2, $time, $3)'
    db.query(query, values)
      .then(() => next()) //On success: continue to next middleware
      .catch((err) => ({ //On failure: continue to global error handling
        log: 'An error occured while store data to db',
        message: err.message,
      }));

  } if (res.locals.bikeInfo) {
    const metric = decimal(res.locals.bikeInfo);
    const percent = findPercent(metric, 'bike');
    const fk_user_id = res.locals.userData.pk_user_id;

    //QUERY
    const values = [ metric, percent, fk_user_id ];
    console.log('bike values', values)

    const query = 
    'INSERT INTO bike_stats (bike_metric, bike_percent, bike_created_at, fk_user_id)' + 'VALUES ($1, $2, $time, $3)'
    db.query(query, values)
      .then(() => next()) //On success: continue to next middleware
      .catch((err) => ({ //On failure: continue to global error handling
        log: 'An error occured while store data to db',
        message: err.message,
      }));

  } if (res.locals.homeInfo) {
    const metric = decimal(res.locals.homeInfo);
    const percent = findPercent(metric, 'home');
    const fk_user_id = res.locals.userData.pk_user_id;

    //QUERY
    const values = [ metric, percent, fk_user_id ];

    const query = 
    'INSERT INTO home_stats (home_metric, home_percent, home_created_at, fk_user_id)' + 'VALUES ($1, $2, $time, $3)'
    db.query(query, values)
      .then(() => next()) //On success: continue to next middleware
      .catch((err) => ({ //On failure: continue to global error handling
        log: 'An error occured while store data to db',
        message: err.message,
      }));
  }

  next();
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
    res.locals.bikeInfo = data.carbon;
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
    res.locals.homeInfo = data.carbon;
    next();
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

module.exports = apiController;