'use strict';

const Validator = require('../../common/validator.js');
const Assert = require('chai').assert;


describe('common validator should', function() {
	it('fail with empty data', function (done) {
		const validationResult = Validator.validate({});

		Assert.equal(validationResult.status, false);
		Assert.equal(validationResult.statusCode, 411);
		Assert.equal(validationResult.message, 'no information was given');

		done();
	});

	it('fail with undefined data', function (done) {
		const validationResult = Validator.validate();

		Assert.equal(validationResult.status, false);
		Assert.equal(validationResult.statusCode, 411);
		Assert.equal(validationResult.message, 'no information was given');

		done();
	});

	it('fail with not empty', function (done) {
		const validationData = [ { field: 'username', input: null, rules: { notEmpty: true } } ];

		Assert.equal(Validator.validate(validationData).status, false);
		Assert.equal(Validator.validate(validationData).statusCode, 411);
		Assert.equal(Validator.validate(validationData).message, 'input for username should not be empty');

		done();
	});

	it('fail with not empty and wrong type', function (done) {
		const validationData = [ { field: 'username', input: 'peter', rules: { notEmpty: true, type: 'integer' } } ];

		Assert.equal(Validator.validate(validationData).status, false);
		Assert.equal(Validator.validate(validationData).statusCode, 422);
		Assert.equal(Validator.validate(validationData).message, 'input for username (\'peter\') is not of type integer');

		done();
	});


	it('fail with not empty and wrong type and different data', function (done) {
		const validationData = [ { field: 'id', input: '98', rules: { notEmpty: false, type: 'integer' } } ];

		Assert.equal(Validator.validate(validationData).status, false);
		Assert.equal(Validator.validate(validationData).statusCode, 422);
		Assert.equal(Validator.validate(validationData).message, 'input for id (\'98\') is not of type integer');

		done();
	});

	it('succeed with empty', function (done) {
		const validationData = [ { field: 'username', input: null, rules: { notEmpty: false } } ];
		Assert.equal(Validator.validate(validationData).status, true);
		done();
	});

	it('succeed with not empty', function (done) {
		const validationData = [ { field: 'username', input: 'this is not empty', rules: { notEmpty: true } } ];
		Assert.equal(Validator.validate(validationData).status, true);
		done();
	});

	it('succeed with not empty string data', function (done) {
		const validationData = [ { field: 'username', input: 'username', rules: { notEmpty: true, type: 'string' } } ];
		Assert.equal(Validator.validate(validationData).status, true);
		done();
	});

	it('succeed with not empty integer data', function (done) {
		const validationData = [ { field: 'id', input: 38, rules: { notEmpty: true, type: 'number' } } ];
		Assert.equal(Validator.validate(validationData).status, true);
		done();
	});
});
