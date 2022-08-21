export { };
require('dotenv').config()
// import controllers from './controllers';
const controllers = require('./controllers')

const express = require('express');
import { Request, Response } from 'express';
const passport = require('passport');
require('./db/passportConfig.ts')(passport);

// const flash = require('express-flash');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(flash())

app.post(
  "/auth/signup",
  passport.authenticate("local-signup", { session: false }),
  (req: any, res: any) => {
    console.log('hitting auth signup')
    res.json({ user: req.user });
  }
);

app.post("/auth/login",
  passport.authenticate("local-login", { session: false }),
  (req: any, res: any) => {
    // console.log(res)
    // console.log('req is...', req.body)
    res.json({ user: req.user });
  }
);


app.post('/share/:email_address/:trip_id', controllers.shareTrip);
app.get('/notes/:user_email/:poi_id', controllers.getNote)

// app.post("/auth/login",
//   // @ts-ignore
//   (req, res, next) => {
//     passport.authenticate("local-login", {
//       session:
//         // @ts-ignore
//         false
//     }, (err: any, user: any, info:any) => {
//       console.log('user is...', user)
//       console.log('info is...', info)

//       if (err) {
//         return next(err)
//       }
//       if (!user) {
//         res.status(401).send(info)
//       }

//       res.json( {user: req.user})

//       })(req, res, next)
//     }


//     );
app.post('/addPOI', controllers.addPOI);

//Trips
app.get('/trips/:user_email', controllers.getUserTrips)
app.get('/trips/archive/:user_email', controllers.getArchiveTrips)
app.post('/trips', controllers.postNewTrip)
app.delete('/trips/:trip_id', controllers.deleteTrip)
app.put('/trips/recover/:trip_id', controllers.recoverTrip);

app.get('/trips/:userEmail/active', controllers.getActiveTripId);



//Notes
app.get('/notes/:user_email/:poi_id', controllers.getNote)
app.put('/updateNote', controllers.updateNote)

//Cities
app.post('/postCities', controllers.postCities)

app.get('/trips/tripinfo/:trip_id', controllers.getTripById);


app.delete('/trips/:tripId/destinations/:destinationId', controllers.deleteDestination);
app.delete('/trips/:tripId/destinations/:destinationId/pois/:poiId', controllers.deletePOI);

//to update the order of destinations in a specific trip
app.put('/trips/:tripId/destinations', controllers.updateDestinationOrder);

//to update the order of POIs in a specific trip
app.put('/trips/:tripId/destinations/:destinationId/pois', controllers.updatePOIOrder);

//Server initialization
app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
