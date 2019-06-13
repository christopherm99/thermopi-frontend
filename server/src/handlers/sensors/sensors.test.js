jest.mock("../../temperature");
const temperature = require("../../temperature");
const sensors = require("./sensors");

describe("GET /sensors", () => {
  let locals = {
    sensors: {
      Bedroom: 50
    }
  };

  beforeEach(() => {
    Object.values(temperature).forEach(fn => {
      fn.mockReset();
    });
  });

  it("Should call getTemperature", () => {
    temperature.getTemperature.mockImplementation(() => ({ value: 50 }));
    let id = "Bedroom";
    let req = mockRequest(locals, undefined, { id });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(temperature.getTemperature).toBeCalledWith({ locals }, id);
    expect(res.send).toBeCalledWith({ value: 50 });
  });

  it("Should respond with 400 (id type check)", () => {
    temperature.getTemperature.mockImplementation(() => {
      throw new TypeError("sample error");
    });
    let req = mockRequest();
    let res = mockResponse();
    sensors.get(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Bad Request: sample error");
  });

  it("Should respond with 404 (id not found)", () => {
    temperature.getTemperature.mockImplementation(() => {
      return { value: undefined };
    });
    let req = mockRequest(locals, undefined, { id: "Bathroom" });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("Sensor Not Found");
  });

  it("Should respond with 500 (internal error)", () => {
    temperature.getTemperature.mockImplementation(() => {
      throw new Error("sample error");
    });
    let req = mockRequest(locals, undefined, { id: "Bathroom" });
    let res = mockResponse(locals);
    sensors.get(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith("Internal Server Error");
  });
});

describe("POST /sensors", () => {
  let locals = {
    sensors: {
      Bedroom: 50
    }
  };

  it("Should call setTemperature", () => {
    let id = "Bedroom";
    let value = 80;
    let req = mockRequest(locals, { value }, { id });
    let res = mockResponse(locals);
    sensors.postID(req, res);
    expect(temperature.setTemperature).toBeCalledWith({ locals }, value, id);
    expect(res.status).toBeCalledWith(202);
    expect(res.send).toBeCalledWith("Accepted");
  });

  it("Should respond with 400 (malformed request)", () => {
    temperature.setTemperature.mockImplementation(() => {
      throw new TypeError("sample error");
    });
    let req = mockRequest();
    let res = mockResponse();
    sensors.postID(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Bad Request: sample error");
  });

  it("Should respond with 500 (error setting sensor value)", () => {
    temperature.setTemperature.mockImplementation(() => {
      throw new Error("sample error");
    });
    let req = mockRequest();
    let res = mockResponse();
    sensors.postID(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith("Internal Server Error");
  });
});
