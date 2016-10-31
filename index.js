const loadConfig = require('./lib/loadConfig');
const api = require('./lib/api');
const path = require('path');

// Config base directory in the project
const configHome = process.env.NODE_ENV_CONFIG_DIR || path.resolve(process.cwd(), './config');
/**
 * Current Config Dir
 * Checks For NODE_ENV otherwise fallback to default directory
 */
const env = process.env.NODE_ENV || 'default';

let config = {
	// Load default config
	default: loadConfig(configHome, 'default')
};

// if env is not default also load config for it
if (env !== 'default') {
 config[env] = loadConfig(configHome, env);
}

// bind default params and export
module.exports = {
	has: api.has.bind(null, env, config),
	get: api.get.bind(null, env, config),
	getAll: api.getAll.bind(null, env, config),
};
