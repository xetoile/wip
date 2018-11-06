'use strict'

const express = require('express');
const app = require('next')({
	dev: process.env.NODE_ENV !== 'production'
});
const api = require('./api');
const publicConfig = require('../config/public');

const server = express();
const port = publicConfig.url.port;
const handler = app.getRequestHandler();

module.exports = app.prepare().then(() => {
	return server
		.use(express.json())
		.use('/api', api)
		.use((req, res) => {
			return handler(req, res);
		})
		.listen(port, () => {
			return console.log(`Express ready at ${publicConfig.url.scheme}://${publicConfig.url.host}:${port}`);
		});
}).catch((err) => {
	console.error(err);
	return process.exit(1);
});