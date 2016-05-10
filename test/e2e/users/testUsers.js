'use strict';

describe('users', function() {
	describe('delete endpoint should', require('./methods/testUsersDelete.js'));
	describe('get endpoint should', require('./methods/testUsersGet.js'));
	describe('post endpoint should', require('./methods/testUsersPost.js'));
	describe('put endpoint should', require('./methods/testUsersPut.js'));
});
