const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db  = require('./database/db');
const errorHandler = require('./utils/error_handler');

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// parse application/json
app.use(cors());

//use sessions for tracking logins
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}));

require('./routes/routes')(app);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});