const express = require("express");
const router = express.Router();
const db = require("../db/db");
  
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [users] = await db.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

  if (users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ user: users[0] });
});

  router.post("/user", async (req, res) => {
    const { username, password } = req.body;
    
    try {
      await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ error: "User already exists or DB error" });
    }
  });

  router.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
        await db.execute("DELETE FROM tasks WHERE user_id = ?", [id]);

        await db.execute("DELETE FROM users WHERE id = ?", [id]);

        res.json({ message: "User and all tasks deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user or tasks" });
    }
  });
  
  router.get("/tasks", async (req, res) => {
    const { user_id } = req.query;

    const [tasks] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [user_id]);

    res.json(tasks);
  });
  
  router.post("/tasks", async (req, res) => {
    const { user_id, title, description, status } = req.body;

    await db.execute("INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)", [user_id, title, description, status]);
    
    res.status(201).json({ message: "Task created" });
  });
  
  router.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;

    const { title, description, status } = req.body;

    await db.execute("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?", [title, description, status, id]);

    res.json({ message: "Task updated" });
  });
  
  router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;

    await db.execute("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Task deleted" });
  });

module.exports=router;