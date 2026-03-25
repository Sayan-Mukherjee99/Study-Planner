const db = require('../config/db');

exports.getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subjects WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createSubject = async (req, res) => {
  const { name, color } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO subjects (user_id, name, color) VALUES (?, ?, ?)',
      [req.user.id, name, color]
    );
    res.json({ id: result.insertId, name, color });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await db.query('DELETE FROM subjects WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Subject removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
