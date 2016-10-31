# libconf [![Build Status](https://travis-ci.org/niksrc/libconf.svg?branch=master)](https://travis-ci.org/niksrc/libconf)


> Minimal config library 

## Requirements
- node > 4

## Install

```
$ npm install --save libconf
```
## Loading
By default it searches in directory specified by `NODE_ENV` and fallback to `default` in case it doesn't find keys there. 
 
Default config dir is `config` which can be overriden by `NODE_ENV_CONFIG_DIR`.

```
❯ tree config
config
├── default
│   ├── app.js
│   └── db.js
├── dev
│   └── db.js
└── test
    └── db.js
```
## Usage

```js
const config = require('libconf');
config.getAll('db') 
/* 
	{ 
		mysql: {
			user: 'roottoor',
			password: 'secretsecret',
			host: 'http://locahost/mariadb',
			port: 1111
		}
	}
*/

config.get('db', 'mysql') 
/* 
	{
		user: 'roottoor',
		password: 'secretsecret',
		host: 'http://locahost/mariadb',
		port: 1111
	}
*/

config.has('db', 'mysql') // true
```


## API
All the methods fallback to default directory incase value in current config dir (`NODE_ENV`) is empty
### config.get(type, key)
Returns value of key in config  `type`
#### type

Type: `string`<br>

File in the config dir

#### key

Type: `string`<br>

Key to fetch in the file `type`

### config.has(type, key)
Checks if key exist in config  `type` returns boolean
#### type

Type: `string`<br>

File in the config dir

#### key

Type: `string`<br>

Key to check in the file `type`


### config.getAll(type)
Returns all keys in config `type`

#### type

Type: `string`<br>

File in the config dir

## License

MIT © [Nikhil Srivastava](https://niksrc.github.io)
