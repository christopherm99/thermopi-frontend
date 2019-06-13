global.mockApp = locals => {
  return { locals };
};

global.mockRequest = (locals, body, params) => {
  body = body ? body : {};
  params = params ? params : {};
  const req = { app: mockApp(locals), body, params };
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
