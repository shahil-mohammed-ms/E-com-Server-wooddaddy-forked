const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const morgan = require('morgan');
const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ('./public'))))
morgan.token("custom-date", (req, res) => {
  return new Date().toUTCString();
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);
console.log(morgan);
app.use('/api',router);

module.exports = app;
