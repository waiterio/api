# waiterio/api

[![Build Status](https://travis-ci.org/waiterio/api.svg?branch=master)](https://travis-ci.org/waiterio/api)
[![Code Climate](https://codeclimate.com/github/waiterio/api/badges/gpa.svg)](https://codeclimate.com/github/waiterio/api)
[![codecov](https://codecov.io/gh/waiterio/api/branch/master/graph/badge.svg)](https://codecov.io/gh/waiterio/api)

testing url currently live at heroku
https://fathomless-crag-87118.herokuapp.com/api/

##Getting Started
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
	port: 8081, // Port on which the application runs
	saltRounds: 10, // Salt rounds for password hashing
	secret: 'SuperSecretWaiterIOStuff', // Password hashing salt
	expireDays: 7, // How long until a token expires
	database: {
		host: 'localhost', // Database host
		port: 5432, // Database port
		database: 'waiter', // Database name
		user: 'waiter', // Database user
		password: 'waiter', // Database password
		ssl: false // Database with SSL or without
	}
}
```


##Getting your Token
All Endpoints at `/api/*` are protected by checking the token that you send as one of the *HEADERS* named `access-token`. You can get your token by executing a POST request to the `/authenticate` endpoint. Two fields are mandatory: `username` and `password`. I already created a basic guest account. The procedure should look a little bit like the following:

```
POST http://https://fathomless-crag-87118.herokuapp.com/authenticate
Body of the request

{
  "username": "guest",
  "password": "guest"
}
```

Which results in an answer similar to this one:

```
Status: 200 OK

{
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNDYxMTg4Mzc3ODc1LCJ1c2VybmFtZSI6ImpvbmFoIiwicm9sZSI6ImFkbWluIn0.daW-SRPv8pBuMdSiadSBB8xroAIoq-D_MxJ4LiHfQCo",
  "expires":1461188377875,
  "user":{
    "id":18,
    "username":"guest",
    "password":"$2a$10$s0m0I9aQWTqFpZqLpvt7p.wsOFnmcVsSrSfsddfEIcxffrdNAaPhfHvWNr2",
    "role":"admin",
    "email":"guest@waiter.io"
  }
}
```
