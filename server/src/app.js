const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("../config.json");
const morganFormat = require("./morgan");
const handlers = require("./handlers/index");
const { initTimetableJob } = require("./schedule");

const app = express();
// Middleware
app.use(morgan(morganFormat));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
// Config
app.locals = config;
initTimetableJob(app);
app.locals.sensors = {};
// Handlers
app.get("/target", handlers.target.get);
app.post("/target", handlers.target.post);

app.listen(config.port, () =>
  // eslint-disable-next-line no-console
  console.log(`App running at: http://localhost:${config.port}/\n`)
);
