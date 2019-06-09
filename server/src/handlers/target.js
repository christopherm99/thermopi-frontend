const { setTarget } = require("../schedule");

module.exports = { 
  get(req, res) {
    res.send(res.app.locals.target);
  },
  post(req, res) {
    try {
      setTarget(res.app, null, req.body.value, req.body.persistant);
    } catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.sendStatus(202);
  }
};