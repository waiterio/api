'use strict';

describe('dishes', function() {
	describe('delete endpoint should', require('./methods/testDishesDelete.js'));
	describe('get endpoint should', require('./methods/testDishesGet.js'));
	describe('post endpoint should', require('./methods/testDishesPost.js'));
	describe('put endpoint should', require('./methods/testDishesPut.js'));
});
