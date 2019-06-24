const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
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
app.locals = config(require("../config.json"));
initTimetableJob(app);
app.locals.hold = false;
app.locals.sensors = {};
// Handlers
app.get("/target", handlers.target.get);
app.post("/target", handlers.target.post);
app.get("/sensors", handlers.sensors.get);
app.get("/sensors/:id", handlers.sensors.get);
app.post("/sensors/:id", handlers.sensors.postID);
app.get("/settings/hold", handlers.settings.hold.getHold);
app.post("/settings/hold", handlers.settings.hold.setHold);

app.listen(app.locals.port, () =>
  // eslint-disable-next-line no-console
  console.log(`App running at: http://localhost:${app.locals.port}/\n`)
);
