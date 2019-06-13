const config = require("./config");

describe("default export", () => {
  it("Should return the value given", () => {
    expect(
      config({
        fanPin: 17,
        compPin: 19,
        port: 8080
      })
    ).toStrictEqual({
      fanPin: 17,
      compPin: 19,
      port: 8080
    });
  });

  it("Should reject if compPin is undefined/malformed", () => {
    expect(() => {
      config({
        fanPin: 17,
        port: 8080
      });
    }).toThrow(new TypeError("compPin undefined or otherwise malformed"));
  });

  it("Should reject if fanPin is undefined/malformed", () => {
    expect(() => {
      config({
        compPin: 19,
        port: 8080
      });
    }).toThrow(new TypeError("fanPin undefined or otherwise malformed"));
  });

  it("Should reject if port is undefined/malformed", () => {
    expect(() => {
      config({
        fanPin: 17,
        compPin: 19
      });
    }).toThrow(new TypeError("port undefined or otherwise malformed"));
  });

  it("Should reject if compPin is not a number", () => {
    expect(() => {
      config({
        fanPin: 17,
        compPin: "19",
        port: 8080
      });
    }).toThrow(new TypeError("compPin type string, not a number"));
  });

  it("Should reject if fanPin is not a number", () => {
    expect(() => {
      config({
        fanPin: "17",
        compPin: 19,
        port: 8080
      });
    }).toThrow(new TypeError("fanPin type string, not a number"));
  });

  it("Should reject if port is not a number", () => {
    expect(() => {
      config({
        fanPin: 17,
        compPin: 19,
        port: "8080"
      });
    }).toThrow(new TypeError("port type string, not a number"));
  });
});
