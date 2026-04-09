import { Redis } from '@upstash/redis';

// Support both the older Vercel KV environment variables and the new Marketplace Upstash Redis variables
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = new Redis({
  url: url || "",
  token: token || "",
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    if (!url || !token) {
       // if no db configured, return null so frontend can fallback
       return res.status(200).json(null);
    }

    const data = await redis.get('portfolio_data');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error reading from Redis:', error);
    return res.status(500).json({ error: error.message });
  }
}
