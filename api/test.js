import { Redis } from '@upstash/redis';

// Support both the older Vercel KV environment variables and the new Marketplace Upstash Redis variables
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = new Redis({
  url: url || "",
  token: token || "",
});

export async function GET() {
    await redis.set("test", "Akshoy");
    const value = await redis.get("test");

    return new Response(JSON.stringify({ value }));
}