var express = require('express');
var client = require('../db/index.js');

const getNote = (req : any, res : any) => {
  // console.log('local tunnel working for get note');
  const querystring = `SELECT * FROM notes WHERE user_email = '${req.params.user_email}' AND poi_id = '${req.params.poi_id}';`

  return client.query(querystring).then((data: any) => {
    // console.log(data.rows);
    res.status(200);
    res.end(JSON.stringify(data.rows[0]));
  }).catch((err: any) => {
    console.log('error at controller getNote.ts', err);
    res.status(400);
    res.end('error 400');
  })
  // res.end('got note')
}

module.exports = getNote;

