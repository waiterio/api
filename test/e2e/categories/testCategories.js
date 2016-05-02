'use strict';

describe('categories', function() {
	describe('delete endpoint should', require('./methods/testCategoriesDelete.js'));
	describe('get endpoint should', require('./methods/testCategoriesGet.js'));
	describe('post endpoint should', require('./methods/testCategoriesPost.js'));
	describe('put endpoint should', require('./methods/testCategoriesPut.js'));
});
