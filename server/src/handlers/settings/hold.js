module.exports = {
  getHold(req, res) {
    res.send({ hold: res.app.locals.hold });
  },
  setHold(req, res) {
    res.app.locals.hold = req.body.hold;
    res.status(202).send("Accepted");
  }
};
