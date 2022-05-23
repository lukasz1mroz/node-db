import { Client } from 'pg';

const client = new Client();
client.connect();

const testDbCall = async () => await client.query('SELECT * FROM users');

export { testDbCall };
