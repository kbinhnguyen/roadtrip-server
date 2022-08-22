var express = require('express');
var client = require('../db/index.js');


const updateNote = (req : any, res : any) => {
  const queryStr = `INSERT INTO notes (content, user_email, poi_id) VALUES ('${req.body.note}' , '${req.body.user_email}' , '${req.body.poi_id}') ON CONFLICT (user_email, poi_id) DO UPDATE SET content = '${req.body.note}'; `

  return client.query(queryStr)
  .then(() => {
    res.send('updated')
  })
  .catch((err: any) => {
    res.send(err)
  })
}

module.exports = updateNote;