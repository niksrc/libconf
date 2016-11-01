var mysql = {
	user: 'roottoor',
	password: 'secretsecret',
	host: 'http://locahost/mariadb',
	port: 1111
};

var cassandra = {
	user: 'nik',
	host: 'locahost',
	port: '3321'
};

var redis = {
	host: 'locahost',
	port: '5553'
};

module.exports = {
	mysql: mysql,
	cassandra: cassandra,
	redis: redis
};
