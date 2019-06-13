# thermopi

[![Build status](https://img.shields.io/travis/christopherm99/thermopi.svg?style=for-the-badge)](https://travis-ci.org/christopherm99/thermopi)
[![Coverage status](https://img.shields.io/coveralls/github/christopherm99/thermopi.svg?style=for-the-badge)](https://coveralls.io/github/christopherm99/thermopi)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/christopherm99/thermopi.svg?style=for-the-badge)](https://github.com/christopherm99/thermopi/network/alerts)
[![Dependency status](https://img.shields.io/david/christopherm99/thermopi.svg?style=for-the-badge)](https://github.com/christopherm99/thermopi/network/dependencies)

[![CC BY 4.0](https://forthebadge.com/images/badges/cc-by.svg)](https://creativecommons.org/licenses/by/4.0/legalcode)
[![Made With JavaScript](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)

thermopi is attempt to make a simplistic thermostat to run on a raspberry pi. It is powered by Vue.js for a frontend to run on the raspberry pi, and express.js, running the A/C logic and serving a simple REST API for easy extensibility.

## Running thermopi

First clone the thermopi repository. NOTE: `git` must be installed.
```bash
git clone https://github.com/christopherm99/thermopi.git
cd thermopi
```
Now install the dependencies for both the Vue.js webapp and the express.js server. NOTE: `nodejs` and `npm` must already be installed.
```bash
npm install
cd server
npm install
```
Configure `config.json` in the `server` folder. This is the default configuration:
```json
{
  "compPin": 0,
  "fanPin": 0,
  "port": 8080
}
```
Finally invoke the server. The Vue.js webapp will be available at the logged url.
```bash
npm start
```

## Contributing

If working on the server, please refer to [those guidelines](https://github.com/christopherm99/thermopi/tree/master/server). Otherwise, follow below:

### Running a development server

The express server **MUST** be invoked first for priority over the 8080 port. To do so, run the following in the `server` directory, which will run `npm start` without executing `build.sh`. 
```bash
npm run nobuild
```
Next, in the `thermopi` (ie. root) directory, run the following for a live reloading development server.
```bash
npm run serve
```

### Linting code

The Vue.js code can (and should) be linted by `npm run lint`. This should be run before all commits. 
