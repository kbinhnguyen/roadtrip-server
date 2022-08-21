var express = require('express');
var client = require('../db/index.js');

const getArchiveTrips = (req: any, res: any) => {

  const queryString = `
  SELECT DISTINCT trips.id, name, status FROM trips
  INNER JOIN user_trip
  ON user_trip.user_email = '${req.params.user_email}'
  WHERE
  trips.status = 'completed' OR trips.status = 'trash';
  `;

  return client.query(queryString)
  .then((data: any) => {
    // console.log(data.rows);
    res.send(data.rows);
  })
  .catch((error: Error) => {
    console.error(error);
  })
}

module.exports = getArchiveTrips;