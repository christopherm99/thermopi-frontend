const { getTemperature, setTemperature } = require("../temperature");

module.exports = {
  get(req, res) {
    try {
      res.send(getTemperature(req.app, req.params.id));
    } catch(err) {
      res.status(400).send(err.message);
      return;
    }
  },
  postID(req, res) {
    try {
      setTemperature(res.app, req.body.value, req.params.id);
    } catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.sendStatus(202);
  }
};