'use strict';

const path = require('path');
const fs = require('fs');

/**
 * Returns a map of config type and values for a given directory
 * @param  {String} home      Base directory of config
 * @param  {String} configDir Directory in which config files are present
 * @return {Object} config    A map config type and value pairs
 */
function loadConfig(home, configDir) {
	const dir = path.join(home, configDir);
	let files = [];
	// Try to load all config files
	try {
		files = fs.readdirSync(dir);
	} catch (error) {
		throw(new Error('Config Directory ' + dir + ' can\'t be accessed'));
	}

	return files
		.reduce(function (acc, file) {
			const configType = path.basename(file, '.js');
			const filePath = path.join(dir, file);
			acc[configType] = require(filePath);
			return acc;
		}, {});
}

module.exports = loadConfig;
