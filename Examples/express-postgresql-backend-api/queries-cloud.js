const pgp = require('pg-promise')();
const { Pool } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://username:password@host:port/database';

// Create a connection pool
const pool = new Pool({
  connectionString: connectionString
});

// Create a database object using the pool
const db = pgp({ pool });

//Resoucre Users

const getUsers = async (request, response) => {
  try {
    const results = await db.any('SELECT * FROM users ORDER BY id ASC');
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const results = await db.any('SELECT * FROM users WHERE id = $1', [id]);
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const createUser = async (request, response) => {
  const { name, email } = request.body;
  try {
    const results = await db.any('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email]);
    response.status(201).json({ id: results[0].id });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  try {
    await db.any('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    response.status(200).json({ id: id });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    await db.any('DELETE FROM users WHERE id = $1', [id]);
    response.status(200).json({ id: id });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};