var express = require('express');
var client = require('../db/index.js');

const getTripID = (req, res) => {
  // console.log('inside trip id', req.body.email)
  return client.query(`SELECT trip_id from user_trip WHERE user_email = $1`, [req.body.email])
    .then( (response) => {
      // console.log('query hitting')
      // console.log(response.rows)
      res.send(response.rows)
    })
}

module.exports = getTripID