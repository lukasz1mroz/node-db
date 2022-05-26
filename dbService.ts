import { Pool } from 'pg';

// Pool setup - add await pool.end() after all calls

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Client error', err);
  process.exit(-1);
});

// Pool DB single async query

const poolDbCallAsync = async (name: string, age: number) => {
  const queryObj = {
    text: 'SELECT * FROM users WHERE name = VALUE($1) AND age = VALUE($2)',
    values: [name, age],
  };

  (async () => {
    const res = await pool.query(queryObj);
    console.log(res);
  })().catch((e) => console.log(e));
};

// Pool DB async query with client

const pollDbClientCallAsync = async (name: string, age: string) => {
  const queryObj = {
    text: 'SELECT * FROM users WHERE name = VALUE($1) AND age = VALUE($2)',
    values: [name, age],
  };

  (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(queryObj);
      console.log(res);
    } finally {
      client.release();
    }
  })().catch((e) => console.log(e));
};

// Pool DB async client transaction

const poolDbAsyncClientTransaction = async (name: string, age: string) => {
  const getDataqueryObj = {
    text: 'SELECT * FROM users WHERE name = VALUE($1) AND age = VALUE($2)',
    values: [name, age],
  };

  (async () => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const res = await client.query(getDataqueryObj);
      const createDataQueryObj = {
        text: 'INSERT INTO users (name, age) VALUES ($1 $2)',
        values: ['Bart', res.rows[0].age + 1],
      };
      await client.query(createDataQueryObj);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => console.error(e));
};

export { poolDbCallAsync, pollDbClientCallAsync, poolDbAsyncClientTransaction };
