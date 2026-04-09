import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    
    // We should ensure the KV url and token exist
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.warn("KV_REST_API variables missing, skipping KV save.");
      return res.status(500).json({ error: 'Database not configured on Vercel' });
    }

    // Save to KV under the key "portfolio_data"
    await kv.set('portfolio_data', data);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving to KV:', error);
    return res.status(500).json({ error: error.message });
  }
}
