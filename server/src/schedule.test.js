jest.mock("jsonfile");
jest.mock("luxon");
jest.mock("node-schedule");
const jsonfile = require("jsonfile");
const { DateTime } = require("luxon");
const { scheduleJob } = require("node-schedule");
const path = require("path");
const schedule = require("./schedule");

describe("getTarget", () => {
  let time = {
    weekday: 1,
    hour: 0
  };
  let now = DateTime.local();
  let timetable = jsonfile.readFileSync();

  it("Should return the target for the requested time", () => {
    expect(schedule.getTarget(time)).toBe(timetable[0][0]);
  });

  it("Should return the current target", () => {
    expect(schedule.getTarget()).toBe(timetable[now.weekday - 1][now.hour]);
  });

  it("Should reject if weekday is not a number", () => {
    expect(() => schedule.getTarget({ weekday: "NaN" })).toThrow(
      new TypeError("weekday type string")
    );
  });

  it("Should reject if hour is not a number", () => {
    expect(() => schedule.getTarget({ weekday: 1, hour: "NaN" })).toThrow(
      new TypeError("hour type string")
    );
  });
});

describe("setTarget", () => {
  let time = {
    weekday: 1,
    hour: 0
  };
  let app = mockApp({ target: 0 });
  const timetablePath = path.join(
    path.resolve(__dirname, ".."),
    "timetable.json"
  );

  it("Should set new target temperature in locals", () => {
    schedule.setTarget(app, 30, false);
    expect(app.locals.target).toBe(30);
  });

  it("Should set new target temperature in jsonfile", () => {
    let target = 30;
    schedule.setTarget(app, target, true, time);
    let newVal = jsonfile.readFileSync();
    newVal[time.weekday][time.hour] = target;
    expect(jsonfile.writeFileSync).toBeCalledWith(timetablePath, newVal);
  });

  it("Should reject if value is not a number", () => {
    expect(() => schedule.setTarget(app, "NaN", false, time)).toThrow(
      new TypeError("value type string")
    );
  });

  it("Should reject if persistent is not a boolean", () => {
    expect(() => schedule.setTarget(app, 40, "not a boolean", time)).toThrow(
      new TypeError("persistent type string")
    );
  });

  it("Should reject if weekday is not a number", () => {
    expect(() =>
      schedule.setTarget(app, 40, false, { weekday: "NaN", hour: 0 })
    ).toThrow(new TypeError("weekday type string"));
  });

  it("Should reject if hour is not a number", () => {
    expect(() =>
      schedule.setTarget(app, 40, false, { weekday: 0, hour: "NaN" })
    ).toThrow(new TypeError("hour type string"));
  });
});

describe("initTimetableJob", () => {
  let app = mockApp({ target: 0 });

  it("Should set the current target", () => {
    let timetable = jsonfile.readFileSync();
    schedule.initTimetableJob(app);
    expect(app.locals.target).toBe(
      timetable[DateTime.local().weekday - 1][DateTime.local().hour]
    );
  });

  it("Should begin the cron job every hour", () => {
    schedule.initTimetableJob(app);
    expect(scheduleJob).toBeCalled();
  });
});
