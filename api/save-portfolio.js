import { Redis } from '@upstash/redis';

// Support both the older Vercel KV environment variables and the new Marketplace Upstash Redis variables
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = new Redis({
  url: url || "",
  token: token || "",
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    
    if (!url || !token) {
      console.warn("Redis REST API variables missing, skipping KV save.");
      return res.status(500).json({ error: 'Database not configured on Vercel' });
    }

    // Save to KV under the key "portfolio_data"
    await redis.set('portfolio_data', data);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving to Redis:', error);
    return res.status(500).json({ error: error.message });
  }
}
