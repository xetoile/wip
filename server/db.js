const Path = require('path');
const store = require('json-fs-store')(Path.join(__dirname, '../database'));

const executorFactory = (method, firstArg) => {
	return (resolve, reject) => {
		const args = [
			(err, res) => {
				if (err) {
					return reject(err);
				}
				return resolve(res);
			}
		];
		if (firstArg) {
			args.unshift(firstArg);
		}
		return store[method].apply(store, args);
	};
};

module.exports = {
	// if no id, lists all
	get: (id) => {
		return new Promise(executorFactory(id ? 'load' : 'list', id));
	},
	set: (document) => {
		if (!document.id) {
			return Promise.reject(new Error('An explicit `id` is required.'));
		}
		return new Promise(executorFactory('add', document));
	}
};