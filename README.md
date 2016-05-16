# waiterio/api :globe_with_meridians:

[![Build Status](https://travis-ci.org/waiterio/api.svg?branch=master)](https://travis-ci.org/waiterio/api)
[![Code Climate](https://codeclimate.com/github/waiterio/api/badges/gpa.svg)](https://codeclimate.com/github/waiterio/api)
[![CodeCov](https://codecov.io/gh/waiterio/api/branch/development/graph/badge.svg)](https://codecov.io/gh/waiterio/api)
[![Dependencies](https://david-dm.org/waiterio/api.svg)](https://david-dm.org/waiterio/api)

The api for the frontend of the waiter service build with postgres and node. To get started, read the 
installation instructions below. If you have a feature or bug, submit an issue.

## Installation [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
Install the required dependencies using `npm` in the projects' root directory. During the installation
of the required modules you can grab a cup of coffee.

```
$ npm install
```

After the dependencies are installed, all that's left is configuring the applications settings to 
your liking. You can find the settings in the `settings.js` file in the projects root directory.

```json
{
	"port": 8081,
	"saltRounds": 10,
	"environment": "development",
	"secret": "SauperSecretWaiterIOStuff",
	"expireDays": 7,
	"database": "waiter.db"
}
```


## Try it out
https://fathomless-crag-87118.herokuapp.com/api/
