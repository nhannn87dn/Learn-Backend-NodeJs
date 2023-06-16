const mysql = require('mysql2');

// MySQL connection options
const connectionOptions = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(connectionOptions);


const getUsers = async (request, response) => {
    try {
      const results = await pool.promise().query('SELECT * FROM users ORDER BY id ASC');
      response.status(200).json(results[0]);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };
  
  const getUserById = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
      const results = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]);
      response.status(200).json(results[0]);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };
  
  const createUser = async (request, response) => {
    const { name, email } = request.body;
    try {
      const results = await pool.promise().query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      response.status(201).json({ id: results[0].insertId });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };
  
  const updateUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    try {
      await pool.promise().query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
      response.status(200).json({ id: id });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };
  
  const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
      await pool.promise().query('DELETE FROM users WHERE id = ?', [id]);
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