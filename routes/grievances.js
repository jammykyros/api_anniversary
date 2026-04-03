const express = require("express");
const router = express.Router();
const db = require("../db.js");

// GET all grievances
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM grievances ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET grievance by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM grievances WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Grievance not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new grievance
router.post("/", async (req, res) => {
  const { title, detail, mood, severity } = req.body;
  try {
    await db.query(
      "INSERT INTO grievances (title, detail, mood, severity) VALUES (?, ?, ?, ?)",
      [title, detail, mood, severity]
    );
    res.status(201).json({ message: "Grievance created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE grievance by ID
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM grievances WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Grievance not found" });
    }
    res.json({ message: "Grievance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
