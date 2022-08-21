var express = require('express');
var client = require('../db/index.js');

/* client will send PUT request to /trips/:trip_id/destinations
body of req will be an object
{
  destination_id # 1: new order 1,
  destination_id # 2: new order 2,
}
*/

const updateDestinationOrder = (req : any, res : any) => {
  const queryInsertStr = Object.entries(req.body).map(([destinationId, orderNumber]) =>  (`('${destinationId}', ${orderNumber})`)).join(', ');
  const query = `UPDATE trip_destination AS td SET order_number = temp.order_number
  FROM (VALUES ${queryInsertStr}) AS temp(destination_id, order_number)
  WHERE td.destination_id = temp.destination_id AND trip_id = ${req.params.tripId}`;

  return client.query(query)
    .then(() => {
      res.status(200).end();
    })
    .catch((err: any) => {
      res.status(500).send(err);
    });
}

module.exports = updateDestinationOrder;