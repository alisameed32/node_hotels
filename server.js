const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();
const passport = require('./auth');
const port = process.env.PORT || 3000;
const app = express();


// Middleware Function

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next(); // move to the next phase
}

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});
app.use(bodyParser.json());
app.use(logRequest);
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);





app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
})


app.listen(3000, () => {
  console.log("Server is Listening at port 3000");
})


