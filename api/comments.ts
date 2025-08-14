// api/comments.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

function sanitize(input: unknown, maxLen: number) {
  return String(input ?? '').trim().slice(0, maxLen);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { name, neighborhood, comment, honeypot } = req.body || {};
      if (honeypot) return res.status(200).json({ ok: true });

      const _name = sanitize(name, 80);
      const _hood = sanitize(neighborhood, 80);
      const _comment = sanitize(comment, 2000);

      if (!_name || !_comment) {
        return res.status(400).json({ ok: false, error: 'Name and comment are required.' });
      }

      await sql`
        INSERT INTO comments (name, neighborhood, comment)
        VALUES (${_name}, ${_hood || null}, ${_comment})
      `;
      return res.status(201).json({ ok: true });
    }

    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT id, name, neighborhood, comment, created_at
        FROM comments
        ORDER BY created_at DESC
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
