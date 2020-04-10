const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const routes = require("./routes");

mongoose.connect(
  "mongodb://bpgarcia:omnistack10@ds233895.mlab.com:33895/dev_radar",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;