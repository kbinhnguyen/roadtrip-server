var express = require('express');
var client = require('../db/index.js');

const getUserTrips = (req: any, res: any) => {

  //May need to optimize this query
  const queryString = `
  SELECT DISTINCT trips.id, name, status FROM trips
  INNER JOIN user_trip
  ON user_trip.trip_id = trips.id
  WHERE
  user_trip.user_email = '${req.params.user_email}'
  AND
  (trips.status = 'planned' OR trips.status = 'active');`

  return client.query(queryString)
  .then((data: any) => {
    res.send(data.rows);
  })
  .catch((error: Error) => {
    console.error(error);
  })
}

module.exports = getUserTrips;