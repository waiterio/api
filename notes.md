# heroku commands

pushing the local db to the heroku one
`heroku pg:push postgres://waiter:waiter@localhost:5432/waiter database --app fathomless-crag-87118`




// INSERT INTO users (username, password) SELECT $1, $2 WHERE  NOT EXISTS (SELECT username FROM users WHERE username = $1) RETURNING id', [ userName, passwordHash ])
//if(returningId != null) {
//	return res.json(returningId);
//} else {
//	return res.status(409).json("username already exist");
//}
