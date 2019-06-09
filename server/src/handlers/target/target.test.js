/* eslint-disable no-undef */
const target = require("./target");

describe("GET /target", () => {
  let locals = { target: 70 };

  it("Should respond with the current target temperature", () => {
    let req = mockRequest(locals);
    let res = mockResponse(locals);
    target.get(req, res);
    expect(res.send).toBeCalledWith(locals.target);
  });
});
