import test from 'ava';
import config from './';
import devDBconfig from './config/dev/db';
import defaultDBconfig from './config/default/db';
import defaultAppConfig from './config/default/app';
test('config get all for a type', t => {
	t.is(config.getAll('db'), devDBconfig);
});

test('config get key', t => {
	t.is(config.get('db', 'cassandra'), devDBconfig.cassandra);
});

test('config has key', t => {
	t.is(config.has('db', 'cassandra'), true);
});

test('default fallback', t => {
	t.plan(2);
	t.is(config.getAll('app',), defaultAppConfig)
	t.is(config.get('db', 'redis'), defaultDBconfig.redis)
})
