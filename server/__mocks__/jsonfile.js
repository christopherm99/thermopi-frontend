module.exports = {
  readFileSync: jest.fn(() => [[50, 60], [70, 80]]),
  writeFileSync: jest.fn()
};
