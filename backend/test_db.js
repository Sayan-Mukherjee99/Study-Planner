const db = require('./config/db');

async function test() {
  try {
    const [rows] = await db.query('SELECT * FROM tasks LIMIT 1');
    const task = rows[0];
    
    // Convert string to Date object
    const dateObj = new Date(task.deadline);
    console.log('Attempting update with Date object:', dateObj);
    
    const query = 'UPDATE tasks SET title = ?, subject_id = ?, deadline = ?, priority = ?, status = ? WHERE id = ?';
    const params = [task.title, task.subject_id, dateObj, task.priority, task.status === 'completed' ? 'pending' : 'completed', task.id];
    
    await db.query(query, params);
    console.log('Update successful with Date object!');
    process.exit(0);
  } catch (err) {
    console.error('Update failed:', err);
    process.exit(1);
  }
}

test();
