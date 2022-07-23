const express = require('express');
const apiController = require('../controllers/apiController');
const tokenController = require('../controllers/tokenController');
const router = express.Router();

//Routes API request to server so we can access the private API_KEY

//car
router.post('/car', tokenController.verifyToken, tokenController.decodeToken, apiController.carStat, apiController.DB, (req, res) => {
  return res.status(200).json(res.locals.carInfo);
});

//bike
router.post('/bike', tokenController.verifyToken, tokenController.decodeToken, apiController.bikeStat, apiController.DB, (req, res) => {
  return res.status(200).json(res.locals.bikeInfo);
});

//home
router.post('/home', tokenController.verifyToken, tokenController.decodeToken, apiController.homeStat, apiController.DB, (req, res) => {
  return res.status(200).json(res.locals.homeInfo);
});

module.exports = router;