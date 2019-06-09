function set(app, val, id) {
  if (typeof val !== "number") {
    throw new TypeError(`val must be type number, but received type ${typeof val}`);
  }
  if (typeof id !== "string") {
    throw new TypeError(`id must be type string, but received type ${typeof id}`);
  }
  app.locals.sensors[id] = val;
}

function __getAll(app) {
  return Object.entries(app.locals.sensors).map((val) => ({
    name: val[0],
    value: val[1]
  }));
}

function __getID(app, id) {
  if (typeof id !== "string") {
    throw new TypeError(`id must be type string, but received type ${typeof id}`);
  }
  return app.locals.sensors[id];
}
module.exports = {
  setTemperature: set,
  getTemperature(app, id) {
    return id ? __getID(id) : __getAll();
  }
};