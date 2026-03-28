const express = require('express');
const router = express.Router();
const db = require('../db'); // this uses your db.js connection pool

// 1. GET all memories
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM memories ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET memory by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM memories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Memory not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST new memory
router.post('/', async (req, res) => {
  const { title, detail, coverimage, video, likes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO memories (title, detail, coverimage, video, likes) VALUES (?, ?, ?, ?, ?)',
      [title, detail, coverimage, video, likes || 0]
    );
    res.status(201).json({ id: result.insertId, title, detail, coverimage, video, likes: likes || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT update memory
router.put('/:id', async (req, res) => {
  const { title, detail, coverimage, video, likes } = req.body;
  try {
    await db.query(
      'UPDATE memories SET title=?, detail=?, coverimage=?, video=?, likes=? WHERE id=?',
      [title, detail, coverimage, video, likes, req.params.id]
    );
    res.json({ message: 'Memory updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE memory
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM memories WHERE id=?', [req.params.id]);
    res.json({ message: 'Memory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
