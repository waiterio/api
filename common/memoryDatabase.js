module.exports.loadDataInMemory = function(sql, database) {
	database.exec(sql, function(error) {
		return error === null;
	});
};
