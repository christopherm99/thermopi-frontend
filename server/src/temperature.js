function set(app, val, id) {
  if (typeof val !== "number") {
    throw new TypeError(`value type ${typeof val}`);
  }
  if (typeof id !== "string") {
    throw new TypeError(`id type ${typeof id}`);
  }
  app.locals.sensors[id] = val;
}

function getAvg(app) {
  let temps = Object.values(app.locals.sensors);
  let sum = 0;
  temps.forEach(t => (sum += t));
  return sum / temps.length;
}

function __getAll(app) {
  return Object.entries(app.locals.sensors)
    .map(val => ({
      name: val[0],
      value: val[1]
    }))
    .sort((a, b) => (a.name < b.name ? -1 : 1));
}

function __getID(app, id) {
  if (typeof id !== "string") {
    throw new TypeError(`id type ${typeof id}`);
  }
  return { value: app.locals.sensors[id] };
}
module.exports = {
  setTemperature: set,
  getTemperature(app, id) {
    return id ? __getID(app, id) : __getAll(app);
  },
  getAverageTemperature: getAvg
};
