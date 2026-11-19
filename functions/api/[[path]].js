export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const target = "https://api.mail.tm/" + path + url.search;
  const headers = new Headers();
  const auth = context.request.headers.get("Authorization");
  if (auth) headers.set("Authorization", auth);
  const ct = context.request.headers.get("Content-Type");
  if (ct) headers.set("Content-Type", ct);
  headers.set("Accept", "application/json");
  let body = undefined;
  if (context.request.method !== "GET" && context.request.method !== "HEAD") {
    body = await context.request.text();
  }
  const res = await fetch(target, { method: context.request.method, headers, body });
  const out = new Headers(res.headers);
  out.set("Access-Control-Allow-Origin", "*");
  out.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  out.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  return new Response(res.body, { status: res.status, headers: out });
}
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  }});
}
