// functions/api/sheet.js
// Cloudflare Pages / Workers Function - GET /api/sheet?tab=schedule|announcements|deadlines

const TABS = {
  schedule: {
    env: "GID_SCHEDULE",
    req: ["day", "start", "end", "course_name_ar"],
  },
  announcements: { env: "GID_ANNOUNCEMENTS", req: ["title"] },
  deadlines: { env: "GID_DEADLINES", req: ["title", "due_at"] },
};

const ENUM = {
  day: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ],
  type: [
    "lecture",
    "section",
    "lab",
    "exam",
    "other",
    "assignment",
    "quiz",
    "midterm",
    "final",
    "project",
  ],
  status: ["normal", "cancelled", "moved", "online", "makeup"],
  priority: ["normal", "important"],
};

const LONG = ["body", "notes"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseCsv(t) {
  const rows = [];
  let row = [],
    f = "",
    q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') {
        if (t[i + 1] === '"') {
          f += '"';
          i++;
        } else q = false;
      } else f += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(f);
      f = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && t[i + 1] === "\n") i++;
      row.push(f);
      rows.push(row);
      row = [];
      f = "";
    } else f += c;
  }
  if (f || row.length) {
    row.push(f);
    rows.push(row);
  }
  return rows;
}

const clean = (v, max) =>
  String(v || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);

function build(tab, csv) {
  const rows = parseCsv(csv).filter((r) => r.some((c) => c.trim()));
  if (!rows.length) return { items: [], warnings: [] };
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const items = [],
    warnings = [],
    ids = new Set();

  rows.slice(1).forEach((r, i) => {
    const o = {};
    head.forEach((h, j) => {
      if (h) o[h] = clean(r[j], LONG.includes(h) ? 500 : 120);
    });
    const bad = (why) => warnings.push({ row: i + 2, reason: why });
    if (/^false$/i.test(o.active || "true")) return;
    const miss = TABS[tab].req.find((k) => !o[k]);
    if (miss) return bad("missing " + miss);
    for (const k of Object.keys(ENUM))
      if (o[k] && !ENUM[k].includes(o[k])) return bad("bad " + k);

    if (tab === "schedule") {
      if (!TIME.test(o.start) || !TIME.test(o.end) || o.end <= o.start)
        return bad("bad time");
      if (o.section && !/^\d+(\s+\d+)*$/.test(o.section))
        return bad("bad section");
      if (
        ["effective_from", "effective_to"].some((k) => o[k] && !DATE.test(o[k]))
      )
        return bad("bad date");
    }
    if (
      tab === "deadlines" &&
      !/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/.test(o.due_at)
    )
      return bad("bad due_at");
    if (o.id) {
      if (ids.has(o.id)) return bad("duplicate id");
      ids.add(o.id);
    }
    if (o.link && !/^https:\/\//i.test(o.link)) o.link = "";
    items.push(o);
  });
  return { items, warnings };
}

export async function onRequest(context) {
  const { request, env } = context;
  const urlObj = new URL(request.url);
  const tab = urlObj.searchParams.get("tab") || "";

  const jsonResponse = (data, status = 200, headers = {}) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });
  };

  if (request.method !== "GET") {
    return jsonResponse({ ok: false, code: "METHOD" }, 405);
  }

  if (!Object.prototype.hasOwnProperty.call(TABS, tab)) {
    return jsonResponse({ ok: false, code: "BAD_TAB" }, 400);
  }

  // قراءة المتغيرات من Cloudflare env
  const pub = env.SHEET_PUB_ID;
  const gid = env[TABS[tab].env];

  if (!pub || !gid) {
    return jsonResponse({ ok: false, code: "CONFIG" }, 503);
  }

  try {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/e/${encodeURIComponent(pub)}/pub?gid=${encodeURIComponent(gid)}&single=true&output=csv`;
   
const r = await fetch(sheetUrl, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  signal: AbortSignal.timeout(10000),
});   
    if (!r.ok) throw new Error("upstream " + r.status);

    const { items, warnings } = build(tab, await r.text());
    return jsonResponse(
      { ok: true, tab, generatedAt: new Date().toISOString(), items, warnings },
      200,
      {
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=600, stale-if-error=86400",
      },
    );
  } catch (e) {
    console.error("Sheet API Error:", e);
    return jsonResponse({ ok: false, code: "UPSTREAM" }, 503);
  }
}
