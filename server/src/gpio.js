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
  console.log(`Setting fan ${state}`);
  if (state !== getFan()) {
    fanIO.writeSync(state);
  }
}

function setCompressor(state) {
  console.log(`Setting fan ${state}`);
  if (state !== getCompressor()) {
    compressorIO.writeSync(state);
  }
}

module.exports = {
  initGpio(app) {
    fanIO = new Gpio(app.locals.fanPin, "out");
    compressorIO = new Gpio(app.locals.compPin, "out");
  },
  initACJob(app) {
    getAverageTemperature() > app.locals.target
      ? setFan(Gpio.HIGH)
      : setFan(Gpio.LOW);
    scheduleJob("* * * * *", () => {
      getAverageTemperature() > app.locals.target
        ? setFan(Gpio.HIGH)
        : setFan(Gpio.LOW);
    });
  },
  getFan,
  getCompressor,
  off() {
    setFan(Gpio.LOW);
    setCompressor(Gpio.LOW);
  },
  fan() {
    setFan(Gpio.HIGH);
    setCompressor(Gpio.LOW);
  },
  ac() {
    setFan(Gpio.HIGH);
    setCompressor(Gpio.HIGH);
  }
};
