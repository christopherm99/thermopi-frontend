const chalk = require("chalk");

module.exports = (tokens, req, res) => {
  let status = tokens.status(req, res);
  if (status !== "304" && tokens.method(req) !== "OPTIONS") {
    /* eslint-disable indent */
    switch (Math.trunc(status / 100)) {
      case 1:
        status = chalk.blue(status);
        break;
      case 2:
        status = chalk.green(status);
        break;
      case 3:
        status = chalk.cyan(status);
        break;
      case 4:
        status = chalk.red(status);
        break;
      default:
        status = chalk.magenta(status);
    }
    /* eslint-enable */

    return [
      chalk.dim(tokens.method(req)),
      chalk.bold(status),
      chalk.dim(req.ip),
      tokens.url(req, res),
      tokens["response-time"](req, res),
      "ms"
    ].join(" ");
  }
};
