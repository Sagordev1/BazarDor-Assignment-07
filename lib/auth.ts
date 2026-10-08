import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { _mongo?: MongoClient };
const client = g._mongo ?? new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017");
if (process.env.NODE_ENV !== "production") g._mongo = client;

const social: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  social.google = { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  social.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.MONGODB_DB ?? "bazardor")),
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
  socialProviders: social,
  plugins: [nextCookies()],
});
