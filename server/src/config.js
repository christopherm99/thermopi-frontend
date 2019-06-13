module.exports = json => {
  if (!json.compPin) {
    throw new TypeError("compPin undefined or otherwise malformed");
  }
  if (!json.fanPin) {
    throw new TypeError("fanPin undefined or otherwise malformed");
  }
  if (!json.port) {
    throw new TypeError("port undefined or otherwise malformed");
  }
  if (typeof json.compPin !== "number") {
    throw new TypeError(`compPin type ${typeof json.compPin}, not a number`);
  }
  if (typeof json.fanPin !== "number") {
    throw new TypeError(`fanPin type ${typeof json.fanPin}, not a number`);
  }
  if (typeof json.port !== "number") {
    throw new TypeError(`port type ${typeof json.port}, not a number`);
  }
  return json;
};
