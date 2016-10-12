var fs = require('fs');
var path = require('path');

// Base Config Directory
var baseDir = process.env.NODE_ENV_CONFIG_DIR || path.resolve(__dirname, './../config');

// Current Config Dir
// Checks For NODE_ENV otherwise fallback to default directory
var env = process.env.NODE_ENV || 'default';

var defaultConfig = getConfig(baseDir, 'default');
var currentConfig = defaultConfig;
// if env is not default load config for it
if (env !== 'default') {
 currentConfig = getConfig(baseDir, env);
}

/**
 * Returns a map of config type and values for a given directory
 * @param  {String} baseDir   Base directory of config
 * @param  {String} configDir Directory in which config files are present
 * @return {Object} config    A map config type and value pairs
 */
function getConfig(baseDir, configDir) {
	var configDir = path.join(baseDir, env)
	var files;
	// Load all config files
	try {
		files = fs.readdirSync(configDir);
	} catch (error) {
		files = [];
		throw('Config Directory ' + configDir + ' can\'t be accessed');
	}

	return files
		.reduce(function (acc, file) {
			var configType = path.basename(file, '.js');
			var filePath = path.join(configDir, file);
			acc[configType] = require(filePath);
			return acc;
		}, {});
}

/**
 * Returns value of config key for a given type that falls back to default config
 * @param  {String} type Type of config
 * @param  {String} key  Key to be looked
 * @return {Anything}    Value of Key in given type
 */
function getKey(type, key) {
	// If key is present in current Config use it
	if (currentConfig[type] && typeof currentConfig[type][key] !== 'undefined') {
		return currentConfig[type][key];
	}

	// else fall back to default config
	if (typeof defaultConfig[type] !== 'undefined') {
		return defaultConfig[type][key];
	}

	// Invalid type
	throw('Invalid config type');
}

/**
 * Returns full config for a given type
 * @param  {String} type Type of config
 * @param  {String} key  Key to be looked
 * @return {Anything}    Value of Key in given type
 */
function getAll(type) {
	// If key is present in current Config use it
	if (typeof currentConfig[type] !== 'undefined') {
		return currentConfig[type];
	}

	// else fall back to default config
	if (typeof defaultConfig[type] !== 'undefined') {
		return defaultConfig[type];
	}

	// Invalid type
	throw('Invalid config type', type);
}

module.exports = {
	get: getKey,
	getAll: getAll
}
