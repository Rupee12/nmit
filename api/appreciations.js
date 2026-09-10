import { neon } from '@neondatabase/serverless';

const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 240;

function cleanText(value) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS appreciations (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(60) NOT NULL,
      message VARCHAR(240) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS appreciations_created_at_idx
    ON appreciations (created_at DESC)
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendError(res, 405, 'Method not allowed.');
  }

  if (!process.env.DATABASE_URL) {
    return sendError(res, 500, 'The appreciation database is not configured.');
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    await ensureTable(sql);

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, name, message, created_at AS "createdAt"
        FROM appreciations
        ORDER BY created_at DESC
        LIMIT 100
      `;
      return res.status(200).json({ items: rows });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body.name !== 'string' || typeof body.message !== 'string') {
      return sendError(res, 400, 'Please provide a name and message.');
    }

    const name = cleanText(body.name);
    const message = cleanText(body.message);
    if (!name || !message) {
      return sendError(res, 400, 'Please provide a name and message.');
    }
    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return sendError(res, 400, 'Your name or message is too long.');
    }

    const [item] = await sql`
      INSERT INTO appreciations (name, message)
      VALUES (${name}, ${message})
      RETURNING id, name, message, created_at AS "createdAt"
    `;

    return res.status(201).json({ item });
  } catch (error) {
    console.error('Appreciation API error:', error);
    return sendError(res, 500, 'The appreciation service is temporarily unavailable.');
  }
}
