const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function sendNotification(entry) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_FROM) {
    return false;
  }

  const safeName = escapeHtml(entry.name);
  const safeEmail = escapeHtml(entry.email);
  const safeMessage = escapeHtml(entry.message).replaceAll('\n', '<br>');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    signal: AbortSignal.timeout(10000),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.NOTIFICATION_FROM,
      to: [process.env.NOTIFICATION_TO || 'georgemwaura058@gmail.com'],
      reply_to: entry.email,
      subject: `New Getozvea enquiry from ${entry.name}`,
      html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Received:</strong> ${entry.receivedAt}</p><p><strong>Message:</strong><br>${safeMessage}</p>`
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend rejected notification (${response.status}): ${details}`);
  }

  return true;
}

function hasValidAdminToken(req) {
  const expected = process.env.CONTACTS_ADMIN_TOKEN;
  const provided = req.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected || !provided) return false;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  return expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

// POST /api/contact  -> save a new message
router.post('/', async (req, res) => {
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

  let notificationSent = false;
  try {
    notificationSent = await sendNotification(entry);
  } catch (error) {
    console.error('Could not send contact notification:', error.message);
  }

  res.status(201).json({ success: true, notificationSent });
});

// GET /api/contact -> list submissions only for an administrator with a secret token.
router.get('/', (req, res) => {
  if (!hasValidAdminToken(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(readMessages());
});

module.exports = router;
