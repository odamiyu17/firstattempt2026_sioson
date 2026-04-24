const db = require('../config/db');

exports.getUsers = (req, res) => {
  const sql = 'SELECT id, name, email, phone, address, role, batch, program FROM users';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

exports.loginUser = (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  const sql = `
    SELECT id, name, email, phone, address, role, batch, program
    FROM users
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Server error',
        error: err
      });
    } else if (result.length === 0) {
      res.status(401).json({
        message: 'Invalid email or password'
      });
    } else {
      res.status(200).json({
        message: 'Login successful',
        user: result[0]
      });
    }
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, email, phone, address, role, batch, program
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Error fetching user',
        error: err
      });
    } else if (result.length === 0) {
      res.status(404).json({
        message: 'User not found'
      });
    } else {
      res.json(result[0]);
    }
  });
};

exports.updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, role, batch, program } = req.body;

  const sql = `
    UPDATE users
    SET name = ?, email = ?, phone = ?, address = ?, role = ?, batch = ?, program = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, email, phone, address, role, batch, program, id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Error updating user',
          error: err
        });
      } else {
        res.json({
          message: 'Profile updated successfully'
        });
      }
    }
  );
};