const { Gpio } = require("onoff");
const { scheduleJob } = require("node-schedule");
const { getAverageTemperature } = require("./temperature");
let fanIO;
let compressorIO;

function getFan() {
  return fanIO.readSync();
}

function getCompressor() {
  return compressorIO.readSync();
}

function setFan(state) {
  if (state !== getFan()) {
    fanIO.writeSync(state);
  }
}

function setCompressor(state) {
  if (state !== getCompressor()) {
    compressorIO.writeSync(state);
  }
}

function off() {
  setFan(Gpio.LOW);
  setCompressor(Gpio.LOW);
}

function ac() {
  setFan(Gpio.HIGH);
  setCompressor(Gpio.HIGH);
}

module.exports = {
  initGpio(app) {
    fanIO = new Gpio(app.locals.fanPin, "out");
    compressorIO = new Gpio(app.locals.compPin, "out");
  },
  initACJob(app) {
    getAverageTemperature(app) > app.locals.target ? ac() : off();
    if (app.locals.test) {
      console.log("Test mode on");
      setInterval(() => {
        console.log("AC JOB CHECK");
        getAverageTemperature(app) > app.locals.target ? ac() : off();
      }, 1000);
    } else {
      scheduleJob("0/10 * * * *", () => {
        // Runs every 10 minutes
        getAverageTemperature(app) > app.locals.target ? ac() : off();
      });
    }
  },
  getFan,
  getCompressor,
  off,
  fan() {
    setFan(Gpio.HIGH);
    setCompressor(Gpio.LOW);
  },
  ac
};
