module.exports = {
	has: hasKey,
	get: getKey,
	getAll: getAll
};

/**
 * Returns value of config key for a given type that falls back to default config
 * @param  {String}   env    Current key
 * @param  {String}   config Config Object
 * @param  {String}   type   Type of config
 * @param  {String}   key    Key to be looked
 * @return {Object}          status and location of key
 */
function isKeyExists(env, config, type, key) {
	const currentConfig = config[env];
	const defaultConfig = config.default;
	// If key is present in current Config use it
	if (typeof currentConfig[type] !== 'undefined' && typeof currentConfig[type][key] !== 'undefined') {
		return {exists: true, configEnv: env};
	}

	// else fall back to default Config
	if (typeof defaultConfig[type] !== 'undefined' && typeof defaultConfig[type][key] !== 'undefined') {
		return {exists: true, configEnv: 'default'};
	}

	// Invalid type
	return {exists: false};
}

/**
 * Returns full config for a given type
 * @param  {String}   env    Current key
 * @param  {String}   config Config Object
 * @param  {String}   type   Type of config
 * @return {Object}        status of type and it's location
 */
function isTypeExists(env, config, type) {
	const currentConfig = config[env];
	const defaultConfig = config.default;
	// If type is present in current Config use it
	if (typeof currentConfig[type] !== 'undefined') {
		return {exists: true, configEnv: env};
	}

	// else fall back to default Config
	if (typeof defaultConfig[type] !== 'undefined') {
		return {exists: true, configEnv: 'default'};
	}

	// Invalid type
	return {exists: false};
}

/**
 * Returns full config for a given type
 * @param  {String}   env    Current key
 * @param  {String}   config Config Object
 * @param  {String}   type   Type of config
 * @return {Anything}        Value of config for type
 */
function getAll(env, config, type) {
	const result = isTypeExists(env, config, type);
	if (result.exists) {
		return config[result.configEnv][type];
	}

	throw (new Error('Invalid config type' + type));
}

/**
 * Returns value of config key for a given type that falls back to default config
 * @param  {String}   env    Current key
 * @param  {String}   config Config Object
 * @param  {String}   type   Type of config
 * @param  {String}   key    Key to be looked
 * @return {Anything}        Value of Key in given type
 */
function getKey(env, config, type, key) {
	const result = isKeyExists(env, config, type, key);
	if (result.exists) {
		return config[result.configEnv][type][key];
	}

	throw (new Error('Invalid key ' + key + ' for ' + type));
}

/**
 * Returns value of config key for a given type that falls back to default config
 * @param  {String} env    Current key
 * @param  {String} config Config Object
 * @param  {String} type   Type of config
 * @param  {String} key    Key to be looked
 * @return {Boolean}       key exists or not
 */
function hasKey(env, config, type, key) {
	const result = isKeyExists(env, config, type, key);
	return result.exists;
}
