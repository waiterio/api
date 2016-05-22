# waiterio/api :globe_with_meridians:

[![Build Status](https://travis-ci.org/waiterio/api.svg?branch=master)](https://travis-ci.org/waiterio/api)
[![Code Climate](https://codeclimate.com/github/waiterio/api/badges/gpa.svg)](https://codeclimate.com/github/waiterio/api)
[![CodeCov](https://codecov.io/gh/waiterio/api/branch/development/graph/badge.svg)](https://codecov.io/gh/waiterio/api)
[![Dependencies](https://david-dm.org/waiterio/api.svg)](https://david-dm.org/waiterio/api)

The api for the frontend of the waiter service build with postgres and node. To get started, read the 
installation instructions below. If would like to request a feature or report a bug, please
[submit an issue](/waiterio/api/issues/new).

## Installation
There are two ways to get the api up and running. The simplest way is to press this magical :rainbow:
button that deploys the project to your one of your [heroku](https://heroku.com) dynos.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

If you'd rather get your hands dirty and do it yourself, you first of all need to
[clone this repository](https://help.github.com/articles/cloning-a-repository/). After you have done that,
you need to install the required dependencies using `npm`. During the installation of the required modules
you might as well grab a cup of coffee (depending on your internet connection this might take a little longer).

```
$ npm install
```

After the dependencies are installed, all that's left is configuring the applications settings to your liking.
You can find the settings in the `settings.js` file in the projects root directory.

```json
{
	"port": 8081,
	"saltRounds": 10,
	"environment": "development",
	"secret": "SuperSecretWaiterIOStuff",
	"expireDays": 7,
	"database": "waiter.db"
}
```

## Try it yourself
There's a live demo of this api at: https://waiterio-api.herokuapp.com/
