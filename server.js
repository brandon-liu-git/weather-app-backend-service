const express = require('express');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db  = require('./database/db');

const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const subscrptionRouter = require('./routes/subscription');
const checkLoggedInRouter = require('./routes/check_logged_in');

app.use(express.json())
app.use(cookieParser());

// parse application/json
app.use(cors());

app.use('/my_weather_app', signUpRouter);
app.use('/my_weather_app', loginRouter);
app.use('/my_weather_app', subscrptionRouter);
app.use('/my_weather_app', checkLoggedInRouter);


//use sessions for tracking logins
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});