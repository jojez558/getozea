const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'messages.json');

function readMessages() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

// POST /api/contact  -> save a new message
router.post('/', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are all required.' });
  }

  const entry = {
    id: Date.now().toString(36),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString()
  };

  const messages = readMessages();
  messages.push(entry);
  writeMessages(messages);

  res.status(201).json({ success: true });
});

// GET /api/contact  -> list saved messages (for George to check submissions)
router.get('/', (req, res) => {
  res.json(readMessages());
});

module.exports = router;
