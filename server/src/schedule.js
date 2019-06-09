const jsonfile = require("jsonfile");
const path = require("path");
const { scheduleJob } = require("node-schedule");
const { DateTime } = require("luxon");

var timetable = jsonfile.readFileSync(
  path.join(path.resolve(__dirname, ".."), "timetable.json")
);

function get(time) {
  let err = isInvalidTime(time);
  if (err) {
    throw new TypeError(err);
  }
  return __get(
    time || {
      day: DateTime.local().weekday,
      hour: DateTime.local().hour
    }
  );
}

function __get(time) {
  return timetable[time.day][time.hour];
}

function set(app, time, val, persist) {
  let err = isInvalidTime(time);
  if (err) {
    throw new TypeError(err);
  }
  if (typeof val !== "number") {
    throw new TypeError(
      `val must be type number, but received type ${typeof val}`
    );
  }
  if (typeof persist !== "boolean") {
    throw new TypeError(
      `persist must be type number, but received type ${typeof persist}`
    );
  }
  /* eslint-disable indent */
  persist
    ? __set(
        app,
        time || {
          day: DateTime.local().weekday,
          hour: DateTime.local().hour
        },
        val
      )
    : __setTarget(app, val);
  /* eslint-enable */
}

function __set(app, time, val) {
  timetable[time.weekday][time.hour] = val;
  jsonfile.writeFileSync("../timetable.json", timetable);
  __setTarget(app, val);
}

function __setTarget(app, val) {
  app.locals.target = val;
}

function isInvalidTime(time) {
  if (time) {
    if (typeof time.weekday !== "number") {
      return `time.weekday must be type number, but received type ${typeof time.weekday}`;
    }
    if (typeof time.hour !== "number") {
      return `time.hour must be type number, but received type ${typeof time.hour}`;
    }
  }
  return false;
}

module.exports = {
  initTimetableJob(app) {
    __setTarget(app, get());
    return scheduleJob("0 * * * *", () => {
      __setTarget(app, get());
    });
  },
  getTarget: get,
  setTarget: set
};
