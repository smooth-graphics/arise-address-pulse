export const config = { runtime: "edge" };

const TARGET_BASE = "https://genietalapi.projectgenietalmetaverse.org";
const ALLOWED_METHODS = "GET,POST,PUT,PATCH,DELETE,OPTIONS";
const DEFAULT_ALLOWED_HEADERS = "Content-Type, Authorization, X-Requested-With, Accept, Origin";

function buildCorsHeaders(origin?: string, req?: Request) {
  const requestHeaders = req?.headers.get("access-control-request-headers");
  return {
    "Access-Control-Allow-Origin": origin || "*",
    Vary: "Origin, Access-Control-Request-Headers, Access-Control-Request-Method",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": ALLOWED_METHODS,
    "Access-Control-Allow-Headers": requestHeaders || DEFAULT_ALLOWED_HEADERS,
    "Access-Control-Max-Age": "86400",
  } as Record<string, string>;
}

function filterHeaders(headers: Headers): Headers {
  const out = new Headers();
  headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (
      [
        "origin",
        "host",
        "referer",
        "x-forwarded-host",
        "x-forwarded-for",
        "accept-encoding",
        "connection",
        "content-length",
      ].includes(k)
    )
      return;
    out.set(key, value);
  });
  return out;
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const origin = req.headers.get("origin") || "*";

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(origin, req) });
  }

  // Compute target URL: /api/java/... -> forward ... to TARGET_BASE
  const segments = url.pathname.split("/").filter(Boolean);
  const idx = segments.indexOf("java");
  const after = idx >= 0 ? segments.slice(idx + 1) : [];
  const targetPath = after.join("/");
  const targetUrl = new URL(`${TARGET_BASE}/${targetPath}${url.search}`);

  // Prepare request to backend (do not forward Origin)
  const headers = filterHeaders(req.headers);

  const init: RequestInit = {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : (req as any).body,
  };

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, init);
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Upstream fetch failed", details: e?.message || String(e) }),
      {
        status: 502,
        headers: {
          "content-type": "application/json",
          ...buildCorsHeaders(origin, req),
        },
      }
    );
  }

  const resHeaders = new Headers(upstream.headers);
  const cors = buildCorsHeaders(origin, req);
  Object.entries(cors).forEach(([k, v]) => resHeaders.set(k, v));

  return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
}
