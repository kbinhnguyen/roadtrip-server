var express = require('express');
var client = require('../db/index.js');

const deleteTrip = (req, res) => {
  console.log('inside delete trip query');
  const queryString = `
  DELETE FROM trips WHERE id = ${req.params.trip_id};
  `
  return client.query(queryString)
  .then(() => {
    res.send('Deleted');
  })
  .catch((error) => {
    console.error(error);
  })
}

module.exports = deleteTrip;