global.mockRequest = (locals, body, params) => {
  const req = { app: {}, body, params };
  req.app.locals = { ...locals };
  return req;
};

global.mockResponse = locals => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.app = {};
  res.app.locals = { ...locals };
  res.send = jest.fn();
  return res;
};
