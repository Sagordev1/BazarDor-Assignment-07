import { MongoClient } from "mongodb";

export async function GET() {
  const out: Record<string, unknown> = {
    MONGODB_URI_set: !!process.env.MONGODB_URI,
    BETTER_AUTH_SECRET_set: !!process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? null,
  };
  try {
    const c = new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017", {
      serverSelectionTimeoutMS: 5000,
    });
    await c.connect();
    await c.db().command({ ping: 1 });
    await c.close();
    out.mongo = "ok";
  } catch (e) {
    out.mongo = String(e);
  }
  return Response.json(out);
}