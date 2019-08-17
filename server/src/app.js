const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
const morganFormat = require("./morgan");
const handlers = require("./handlers/index");
const { initTimetableJob } = require("./schedule");
const { initGpio, initACJob } = require("./gpio");

const app = express();

// Middleware
app.use(morgan(morganFormat)); // Logs
app.use(cors()); // Allows CORS
app.use(bodyParser.json()); // Auto-parses JSON
app.use(express.static("public")); // Serves static Vue webserver

// Config
app.locals = config(require("../config.json")); // Imports from config file
initTimetableJob(app); // Starts reading from timetable.json
initGpio(app); // Opens GPIO pins
initACJob(app); // Starts setting AC on and off
app.locals.hold = false; // Sets default temp hold status
app.locals.sensors = {}; // Initializes sensors

// Handlers
// target
app.get("/target", handlers.target.get);
app.post("/target", handlers.target.post);
// sensors
app.get("/sensors", handlers.sensors.get);
app.get("/sensors/:id", handlers.sensors.get);
app.post("/sensors/:id", handlers.sensors.postID);
// settings
app.get("/settings/hold", handlers.settings.hold.getHold);
app.post("/settings/hold", handlers.settings.hold.setHold);

app.listen(app.locals.port, () =>
  // eslint-disable-next-line no-console
  console.log(`App running at: http://localhost:${app.locals.port}/\n`)
);
