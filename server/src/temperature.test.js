const temperature = require("./temperature");

let app = mockApp({
  sensors: {
    Bedroom: 45,
    Kitchen: 55
  }
});

describe("getTemperature", () => {
  describe("get all", () => {
    it("Should return a list of values of all sensors, sorted alphabetically", () => {
      expect(temperature.getTemperature(app)).toStrictEqual([
        { name: "Bedroom", value: 45 },
        { name: "Kitchen", value: 55 }
      ]);
    });
  });

  describe("get by id", () => {
    it("Should return an object describing the requested sensor", () => {
      expect(temperature.getTemperature(app, "Kitchen")).toStrictEqual({
        value: 55
      });
    });

    it("Should reject if id is not a string", () => {
      expect(() => temperature.getTemperature(app, 10)).toThrow(
        new TypeError("id type number")
      );
    });
  });
});

describe("setTemperature", () => {
  it("Should assign the reported temperature to the sensor", () => {
    temperature.setTemperature(app, 65, "Bathroom");
    expect(app.locals.sensors.Bathroom).toBe(65);
  });

  it("Should reject if value is not a number", () => {
    expect(() => temperature.setTemperature(app, "NaN", "Bathroom")).toThrow(
      new TypeError("value type string")
    );
  });

  it("Should reject if id is not a string", () => {
    expect(() => temperature.setTemperature(app, 75, 10)).toThrow(
      new TypeError("id type number")
    );
  });
});
