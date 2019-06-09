/* eslint-disable no-undef */
const sensors = require("./sensors");

describe("GET /sensors", () => {
  let locals = {
    sensors: {
      Bedroom: 50
    }
  };
  it("Should respond with a list of all sensors", () => {
    let req = mockRequest(locals);
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.send).toBeCalledWith([{ name: "Bedroom", value: 50 }]);
  });

  it("Should respond with the temperature of a specific sensor", () => {
    let req = mockRequest(locals, undefined, { id: "Bedroom" });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.send).toBeCalledWith({ value: 50 });
  });

  it("Should respond with 400 (id type check)", () => {
    let req = mockRequest(locals, undefined, { id: 80 });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Bad Request: id type number");
  });

  it("Should respond with 404 (id not found)", () => {
    let req = mockRequest(locals, undefined, { id: "Bathroom" });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("Sensor Not Found");
  });
});
