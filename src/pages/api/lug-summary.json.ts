import type { APIRoute } from "astro";
import { getMergedLugRepos } from "@/lib/lugStatus";

export const GET: APIRoute = async () => {
  try {
    const repos = await getMergedLugRepos();
    const payload = repos.map(([name, repo]) => ({
      name,
      ...repo,
    }));

    return new Response(JSON.stringify({ repos: payload }), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
};
