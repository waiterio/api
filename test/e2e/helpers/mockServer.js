'use strict';

process.env.NODE_ENV = 'test';

const server = require('../../../server.js');
const mockDB = require('../../../common/sqlite.js')({ database: ':memory:', environment: 'development' });

server.set('db', mockDB);

module.exports = server;
