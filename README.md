# waiterio/api :globe_with_meridians:

[![Build Status](https://travis-ci.org/waiterio/api.svg?branch=master)](https://travis-ci.org/waiterio/api)
[![Code Climate](https://codeclimate.com/github/waiterio/api/badges/gpa.svg)](https://codeclimate.com/github/waiterio/api)
[![codecov](https://codecov.io/gh/waiterio/api/branch/master/graph/badge.svg)](https://codecov.io/gh/waiterio/api)

## Installation
What you will need:
* Postgres Server
* Node 4 and above

To get your database ready, all you need to do is create a new database (`waiter` in this example) 
and import the `setup.sql` into that database. This will configure all the necessary tables. 

```
$ psql waiter < setup.sql
```

While the database is preparing you can already install the required dependencies using `npm` in 
the projects root directory.

```
$ npm install
```

After the dependencies are installed, all that's left is configuring the application settings to 
your liking. You can find the settings in the `settings.js` file in the projects root directory.

```json
{
	"port": 8081,
	"saltRounds": 10,
	"secret": "SuperSecretWaiterIOStuff",
	"expireDays": 7,
	"database": {
		"host": "localhost',
		"port": 5432,
		"database": "waiter",
		"user": "waiter",
		"password": "waiter",
		"ssl": false
	}
}
```


## Try it out
https://fathomless-crag-87118.herokuapp.com/api/
