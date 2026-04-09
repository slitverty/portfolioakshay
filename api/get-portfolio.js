import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
       // if no db, return null so frontend can fallback
       return res.status(200).json(null);
    }

    const data = await kv.get('portfolio_data');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error reading from KV:', error);
    return res.status(500).json({ error: error.message });
  }
}
