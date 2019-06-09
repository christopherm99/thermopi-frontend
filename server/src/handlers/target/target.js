const { setTarget } = require("../../schedule");

module.exports = {
  get(req, res) {
    res.app.locals.target
      ? res.send(res.app.locals.target)
      : res.status(500).send("Target temperature is unset");
  },
  post(req, res) {
    try {
      setTarget(res.app, null, req.body.value, req.body.persistant);
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
    res.sendStatus(202);
  }
};
