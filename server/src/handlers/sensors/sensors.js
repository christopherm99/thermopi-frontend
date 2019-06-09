const { getTemperature, setTemperature } = require("../../temperature");

module.exports = {
  get(req, res) {
    try {
      let response = getTemperature(req.app, req.params.id);
      if (Array.isArray(response) || response.value) {
        res.send(response);
      } else {
        res.status(404).send("Sensor Not Found");
      }
    } catch (err) {
      err instanceof TypeError
        ? res.status(400).send("Bad Request: " + err.message)
        : res.status(500).send("Internal Server Error");
      return;
    }
  },
  postID(req, res) {
    try {
      setTemperature(res.app, req.body.value, req.params.id);
    } catch (err) {
      err instanceof TypeError
        ? res.status(400).send("Bad Request: " + err.message)
        : res.status(500).send("Internal Server Error");
      return;
    }
    res.status(202).send("Accepted");
  }
};
