var client = require('../db/index.js');
var express = require('express');

const addPOI =  (req : any, res : any) => {
  // console.log('In addPOI req.body = ', req.body)
  const {POIname, desID, POIID, order, tripID} = req.body;

  const queryString = `BEGIN;
    INSERT INTO pois (id, name) VALUES ('${POIID}', '${POIname}') ON CONFLICT (id) DO NOTHING;
    INSERT INTO trip_destination_poi (trip_destination_id, poi_id, order_number) VALUES ((SELECT id FROM trip_destination WHERE destination_id = '${desID}' AND trip_id = ${tripID}), '${POIID}', ${order});
    COMMIT;`

  return client.query(queryString)
    .then(() => {
      res.status(200).send('updated')
    })
    .catch((err: any) => {
      console.log('addPOI DB insert failed err = ', err);
      res.status(500).send(err)
    })
}

module.exports = addPOI;
/*
  BEGIN;
  INSERT INTO pois (id, name) VALUES ('111', 'test');
  INSERT INTO trip_destination_poi (trip_destination_id, poi_id, order_number) VALUES ((SELECT id FROM trip_destination WHERE destination_id = 1), '111', '1');
  COMMIT;
*/

/*
INSERT INTO pois (id, name) VALUES ('3nLx7-buUBjFz9MASgXDMA', 'South Coast Botanic Garden') ON CONFLICT (id) DO NOTHING;
SELECT id FROM trip_destination WHERE destination_id = 'ChIJfcS6fx7LwoARZYDiqXgXL6E' AND trip_id = 1
INSERT INTO trip_destination_poi (trip_destination_id, poi_id, order_number) VALUES (1, '3nLx7-buUBjFz9MASgXDMA', 1);
*/