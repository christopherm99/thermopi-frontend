/* eslint-disable no-undef */
jest.mock("../../schedule");
const schedule = require("../../schedule");
const target = require("./target");

describe("GET /target", () => {
  let locals = { target: 70 };

  it("Should respond with the current target temperature", () => {
    let req = mockRequest(locals);
    let res = mockResponse(locals);
    target.get(req, res);
    expect(res.send).toBeCalledWith(locals.target);
  });

  it("Should respond with 500 (target unset)", () => {
    let req = mockRequest();
    let res = mockResponse();
    target.get(req, res);
    expect(res.status).toBeCalledWith(503);
    expect(res.send).toBeCalledWith("Service Unavailable: Target Unset");
  });
});

describe("POST /target", () => {
  let locals = {};

  beforeEach(() => {
    locals = {
      target: 80
    };
  });

  it("Should call setTarget with new target", () => {
    let value = 75;
    let persistent = false;
    let req = mockRequest(locals, { value, persistent });
    let res = mockResponse(locals);
    target.post(req, res);
    expect(schedule.setTarget).toBeCalledWith({ locals }, value, persistent);
  });

  it("Should respond with 202 (no error)", () => {
    let req = mockRequest();
    let res = mockResponse();
    target.post(req, res);
    expect(res.status).toBeCalledWith(202);
    expect(res.send).toBeCalledWith("Accepted");
  });
  it("Should respond with 400 (error setting target)", () => {
    schedule.setTarget.mockImplementation(() => {
      throw new TypeError("sample error");
    });
    let req = mockRequest();
    let res = mockResponse();
    target.post(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Bad Request: sample error");
  });
});
