const express = require('express');
const db = require('./db');

module.exports = express.Router()
	.get('/configuration/:id?', (req, res) => {
		// if `id` then pure Object, else {configurations: Array<Object>}
		return db.get(req.params.id).then((data) => {
			if (!req.params.id) {
				data = { configurations: data || [] };
			}
			return res.json(data);
		})
	})
	.post('/configuration', (req, res) => {
		return db.set(req.body).then(res.json);
	});