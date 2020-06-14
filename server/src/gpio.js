const { Gpio } = require("onoff");
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
  setFan(Gpio.HIGH);
  setCompressor(Gpio.HIGH);
}

function ac() {
  setFan(Gpio.LOW);
  setCompressor(Gpio.LOW);
}

module.exports = {
  initGpio(app) {
    fanIO = new Gpio(app.locals.fanPin, "out");
    compressorIO = new Gpio(app.locals.compPin, "out");
  },
  initACJob(app) {
    off();
    if (app.locals.test) {
      // Test mode (checks AC every second)
      setInterval(() => {
        getAverageTemperature(app) > app.locals.target ? ac() : off();
      }, 1000);
    } else {
      setInterval(() => {
        getAverageTemperature(app) > app.locals.target ? ac() : off();
      }, 1000 * 60 * 10);
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
