const jsonfile = require("jsonfile");
const path = require("path");
const { scheduleJob } = require("node-schedule");
const { DateTime } = require("luxon");

const timetablePath = path.join(
  path.resolve(__dirname, ".."),
  "timetable.json"
);

var timetable = jsonfile.readFileSync(timetablePath);

function sync() {
  timetable = jsonfile.readFileSync(timetablePath);
}

function get(time) {
  let err = isInvalidTime(time);
  if (err) {
    throw new TypeError(err);
  }
  return __get(
    time || {
      weekday: DateTime.local().weekday,
      hour: DateTime.local().hour
    }
  );
}

function __get(time) {
  return timetable[time.weekday][time.hour];
}

function set(app, val, persistent, time) {
  let err = isInvalidTime(time);
  if (err) {
    throw new TypeError(err);
  }
  if (typeof val !== "number") {
    throw new TypeError(`value type ${typeof val}`);
  }
  if (typeof persistent !== "boolean") {
    throw new TypeError(`persistent type ${typeof persistent}`);
  }
  /* eslint-disable indent */
  persistent
    ? __set(
        app,
        time || {
          weekday: DateTime.local().weekday,
          hour: DateTime.local().hour
        },
        val
      )
    : __setTarget(app, val);
  /* eslint-enable */
}

function __set(app, time, val) {
  timetable[time.weekday][time.hour] = val;
  jsonfile.writeFileSync(timetablePath, timetable);
  __setTarget(app, val);
}

function __setTarget(app, val) {
  app.locals.target = val;
}

function isInvalidTime(time) {
  if (time) {
    if (typeof time.weekday !== "number") {
      return `weekday type ${typeof time.weekday}`;
    }
    if (typeof time.hour !== "number") {
      return `hour type ${typeof time.hour}`;
    }
  }
  return false;
}

module.exports = {
  initTimetableJob(app) {
    sync();
    __setTarget(app, get());
    return scheduleJob("0 * * * *", () => {
      __setTarget(app, get());
    });
  },
  getTarget: get,
  setTarget: set
};
