const express = require('express');
const apiController = require('../controllers/apiController');
const tokenController = require('../controllers/tokenController');
const router = express.Router();

//Routes API request to server so we can access the private API_KEY

//car
router.post('/car', apiController.carStat, (req, res) => {
  return res.status(200).json(res.locals.carInfo);
});

//bike
router.post('/bike', apiController.bikeStat, (req, res) => {
  return res.status(200).json(res.locals.bikeInfo);
});

//home
router.post('/home', apiController.homeStat, (req, res) => {
  return res.status(200).json(res.locals.homeInfo);
});

module.exports = router;