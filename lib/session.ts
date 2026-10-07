import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}

/** Protected route helper: redirects to /signin with a toast reason. */
export async function requireUser(next: string) {
  const session = await getSession();
  if (!session) redirect(`/signin?reason=protected&next=${encodeURIComponent(next)}`);
  return session.user;
}
