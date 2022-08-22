var client = require('../db/index.js');
var express = require('express');

const postCities = async (req: any, res: any) => {
  type CityInfo = {name: string, id: string, lat: number, lng: number, trip_id: number, lastIndex: number};


  req.body.forEach(async (city: CityInfo, i: number) => {
    city.lastIndex+= i + 1
    var values = [city.name, city.id, city.lat, city.lng, city.trip_id, city.lastIndex]
    var queryString = `WITH city AS (
      INSERT INTO destinations(name, id, lat, lng)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id) DO NOTHING)
    INSERT INTO trip_destination(destination_id, trip_id, order_number)
    VALUES($2, $5, $6)`;

    var results = await client.query(queryString, values)
    try{ console.log('Success posting query from back')}
    catch(err) {console.log('Error in storing data', err)}
  });
}

module.exports = postCities;