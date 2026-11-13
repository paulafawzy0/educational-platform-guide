import crypto from 'crypto';
import handler from './admin.mjs';

const URL_ = 'https://redis.test';
const CODE = 'R'.repeat(60);
Object.assign(process.env, {
  PANEL_PASSWORD: 'panelpass', ADMIN_PASSWORD: 'adminpass', ADMIN_EMAIL: 'a@b.c', RESEND_API_KEY: 'k',
  OWNER_IPS: '1.1.1.1', PANEL_IPS: '2.2.2.2', RECOVERY_IPS: '3.3.3.3', RECOVERY_CODE: CODE,
  TELEGRAM_Notifications_BOT_TOKEN: 't', TELEGRAM_Notifications_CHAT_ID: 'c', UPSTASH_REDIS_REST_URL: URL_, UPSTASH_REDIS_REST_TOKEN: 'x',
  PUBLIC_API_URL: 'https://x.vercel.app/api/push-send'
});

let store, lists, telegram, emails, redisDown;
const reset = () => { store = new Map(); store.set('panel_mode', 'open'); lists = new Map(); telegram = []; emails = []; redisDown = false; };
const glob = (p) => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
function exec(c) {
  const [op, ...a] = c; const O = op.toUpperCase();
  if (O === 'GET') return store.has(a[0]) ? store.get(a[0]) : null;
  if (O === 'SET') { if (a.includes('NX') && store.has(a[0])) return null; store.set(a[0], String(a[1])); return 'OK'; }
  if (O === 'DEL') { return store.delete(a[0]) ? 1 : 0; }
  if (O === 'INCR') { const n = (parseInt(store.get(a[0]) || '0', 10)) + 1; store.set(a[0], String(n)); return n; }
  if (O === 'EXPIRE') return 1;
  if (O === 'LPUSH') { const l = lists.get(a[0]) || []; l.unshift(a[1]); lists.set(a[0], l); return l.length; }
  if (O === 'LTRIM') return 'OK';
  if (O === 'LRANGE') return (lists.get(a[0]) || []).slice(0, 100);
  if (O === 'SCAN') { const re = glob(a[2]); return ['0', [...store.keys()].filter((k) => re.test(k))]; }
  throw new Error('cmd ' + op);
}
globalThis.fetch = async (url, opt = {}) => {
  url = String(url);
  const J = (o) => ({ ok: true, json: async () => o });
  if (url.startsWith('https://api.telegram.org')) { telegram.push(JSON.parse(opt.body).text); return J({ ok: true }); }
  if (url.startsWith('https://api.resend.com')) { emails.push(opt.body); return J({ id: 1 }); }
  if (url.startsWith(URL_)) {
    if (redisDown === 'hang') return new Promise((_, rej) => opt.signal && opt.signal.addEventListener('abort', () => rej(new Error('aborted'))));
    if (redisDown) throw new Error('redis down');
    const p = url.slice(URL_.length);
    if (p.startsWith('/get/')) return J({ result: exec(['GET', decodeURIComponent(p.slice(5))]) });
    if (p.startsWith('/del/')) return J({ result: exec(['DEL', decodeURIComponent(p.slice(5))]) });
    if (p === '/pipeline') return J(JSON.parse(opt.body).map((c) => ({ result: exec(c) })));
    return J({ result: exec(JSON.parse(opt.body)) });
  }
  throw new Error('unexpected fetch ' + url);
};

const adminCookie = () => { const ts = Date.now().toString();
  return 'admin_auth=' + ts + '.' + crypto.createHmac('sha256', 'adminpass').update('admin.' + ts).digest('hex'); };

async function call({ ip, method = 'GET', url = '/api/admin', body, cookie }) {
  const r = { status: 0, body: '', headers: {}, redirect: null };
  const res = {
    setHeader: (k, v) => { r.headers[k.toLowerCase()] = v; }, status(c) { r.status = c; return this; },
    send(b) { r.body = String(b ?? ''); return this; }, end() { return this; },
    redirect(c, u) { r.status = c; r.redirect = u; return this; }
  };
  const headers = { host: 'x.vercel.app', 'x-forwarded-for': ip };
  if (cookie) headers.cookie = cookie;
  if (method === 'POST') headers['sec-fetch-site'] = 'same-origin';
  await handler({ method, url, headers, body, socket: { remoteAddress: ip } }, res);
  return r;
}
const isLogin = (r) => r.status === 401 && r.body.includes('تسجيل الدخول');
const is404 = (r) => r.status === 404 && r.body.includes('NOT_FOUND');
const gateOn = () => store.set('panel_gate:enabled', '1');
const auditHas = (a) => (lists.get('audit:log') || []).some((x) => JSON.parse(x).a === a);
const adminPost = (ip, body) => call({ ip, method: 'POST', body, cookie: adminCookie() });

const otpFromEmail = () => JSON.parse(emails[emails.length - 1]).html.match(/letter-spacing:6px">(\d{6})/)[1];
const setCookies = (r) => [].concat(r.headers['set-cookie'] || []);
const cookieVal = (r, name) => { const c = setCookies(r).find((x) => x.startsWith(name + '=')); return c ? c.split(';')[0] : ''; };
const ban = (ip) => { const v = store.get('ban:' + ip); return v ? JSON.parse(v) : null; };

const tests = [];
const T = (n, f) => tests.push([n, f]);

T('S1 PANEL_PASSWORD غلط × 5 → حظر مؤقت 24 ساعة (والسادس بالباسورد الصح يتقفل)', async () => {
  const ip = '9.9.9.9'; const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await call({ ip, method: 'POST', body: { password: 'wrong' } })).status);
  const b = ban(ip); const left = b && b.until ? b.until - Date.now() : 0;
  const sixth = await call({ ip, method: 'POST', body: { password: 'panelpass' } });
  return codes.slice(0, 4).every((c) => c === 401) && codes[4] === 429 && b.level === 'temp'
    && left > 23.9 * 3600000 && left <= 24 * 3600000 && sixth.status === 429 && auditHas('ban_temp'); });

T('S2 ADMIN_PASSWORD صح + OTP صح → شاشة أدمن', async () => {
  const ip = '9.9.9.9';
  const a = await call({ ip, method: 'POST', body: { password: 'adminpass' } });
  const pending = cookieVal(a, 'panel_pending');
  const b = await call({ ip, method: 'POST', body: { code: otpFromEmail() }, cookie: pending });
  const adm = cookieVal(b, 'admin_auth');
  const page = await call({ ip, cookie: adm });
  return a.status === 200 && !!pending && b.status === 303 && !!adm && page.status === 200 && page.body.includes('إدارة الدخول')
    && page.body.includes('بوابة الدخول') && auditHas('login_ok'); });

T('S3 5 غلطات OTP → حظر دائم', async () => {
  const ip = '9.9.9.9';
  const a = await call({ ip, method: 'POST', body: { password: 'adminpass' } });
  const pending = cookieVal(a, 'panel_pending'); const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await call({ ip, method: 'POST', body: { code: '000000' }, cookie: pending })).status);
  const after = await call({ ip, method: 'POST', body: { password: 'panelpass' } });
  return codes.slice(0, 4).every((c) => c === 401) && codes[4] === 429 && ban(ip).level === 'perm'
    && after.status === 429 && auditHas('ban_perm'); });

T('S4 recovery من IP في RECOVERY_IPS → تجاوز الحظر (303)، ومن IP تاني → 404 (الـ IP بيتحظر دائم)', async () => {
  store.set('ban:3.3.3.3', JSON.stringify({ level: 'perm', fails: 0 }));
  store.set('ban:9.9.9.9', JSON.stringify({ level: 'temp', until: Date.now() + 3600000, fails: 0 }));
  const noCode = await call({ ip: '3.3.3.3' });
  const withCode = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE });
  const wrongIp = await call({ ip: '9.9.9.9', url: '/api/admin?recovery=' + CODE });
  return noCode.status === 429 && withCode.status === 303 && withCode.headers.location === '/api/admin' && wrongIp.status === 404
    && JSON.parse(store.get('ban:9.9.9.9')).level === 'perm' && auditHas('recovery_used') && auditHas('ban_perm'); });

T('S5 whitelist → يتخطى الحظر (غلط كتير مايحظرش، والباسورد الصح يدخل)', async () => {
  const ip = '4.4.4.4'; store.set('whitelist:' + ip, '{"addedAt":1}');
  store.set('ban:' + ip, JSON.stringify({ level: 'perm', fails: 0 }));
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await call({ ip, method: 'POST', body: { password: 'wrong' } })).status);
  const ok = await call({ ip, method: 'POST', body: { password: 'panelpass' } });
  return codes.every((c) => c === 401) && ok.status === 303 && !!cookieVal(ok, 'panel_auth'); });

T('S6 blacklist → 403 (GET و POST بالباسورد الصح)', async () => {
  store.set('blacklist:8.8.8.8', '{"reason":"x"}');
  const g = await call({ ip: '8.8.8.8' });
  const p = await call({ ip: '8.8.8.8', method: 'POST', body: { password: 'panelpass' } });
  return g.status === 403 && p.status === 403 && !cookieVal(p, 'panel_auth'); });

let pass = 0;
for (const [n, f] of tests) {
  reset(); let ok = false, err = '';
  try { ok = await f(); } catch (e) { err = ' — ' + e.message; }
  if (ok) pass++;
  console.log((ok ? '✅ ' : '❌ ') + n + err);
}
console.log(`\n${pass}/${tests.length} passed`);
process.exit(pass === tests.length ? 0 : 1);
