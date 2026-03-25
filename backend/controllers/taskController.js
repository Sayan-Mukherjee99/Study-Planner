const db = require('../config/db');

exports.getTasks = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, s.name as subject_name, s.color as subject_color 
      FROM tasks t 
      LEFT JOIN subjects s ON t.subject_id = s.id 
      WHERE t.user_id = ?
      ORDER BY t.deadline ASC
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createTask = async (req, res) => {
  let { subject_id, title, deadline, priority } = req.body;
  // Convert empty string/null subject_id to null for MySQL
  subject_id = subject_id || null;
  const dateObj = deadline ? new Date(deadline) : null;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, subject_id, title, deadline, priority) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, subject_id, title, dateObj, priority]
    );
    res.json({ id: result.insertId, title, subject_id, deadline, priority, status: 'pending' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  let { title, subject_id, deadline, priority, status } = req.body;
  // Convert empty string/null subject_id to null for MySQL
  subject_id = subject_id || null;
  const dateObj = deadline ? new Date(deadline) : null;
  try {
    await db.query(
      'UPDATE tasks SET title = ?, subject_id = ?, deadline = ?, priority = ?, status = ? WHERE id = ? AND user_id = ?',
      [title, subject_id, dateObj, priority, status, req.params.id, req.user.id]
    );
    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
