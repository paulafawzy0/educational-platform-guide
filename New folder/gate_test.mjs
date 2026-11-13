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
const passes = (r) => r.status === 303 && r.headers.location === '/api/admin';
const is404 = (r) => r.status === 404 && r.body.includes('NOT_FOUND');
const gateOn = () => store.set('panel_gate:enabled', '1');
const auditHas = (a) => (lists.get('audit:log') || []).some((x) => JSON.parse(x).a === a);
const adminPost = (ip, body) => call({ ip, method: 'POST', body, cookie: adminCookie() });

const tests = [];
const T = (n, f) => tests.push([n, f]);
T('1  OFF + أي IP → صفحة دخول', async () => isLogin(await call({ ip: '9.9.9.9' })));
T('2  ON + PANEL_IPS → دخول', async () => { gateOn(); return isLogin(await call({ ip: '2.2.2.2' })); });
T('3  ON + whitelist → دخول', async () => { gateOn(); store.set('whitelist:4.4.4.4', JSON.stringify({ addedAt: 1 })); return isLogin(await call({ ip: '4.4.4.4' })); });
T('4  ON + OWNER_IPS → دخول', async () => { gateOn(); return isLogin(await call({ ip: '1.1.1.1' })); });
T('5  ON + RECOVERY_IPS + recovery code → دخول (وبدون الكود 404)', async () => {
  gateOn();
  const a = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE });
  const b = await call({ ip: '3.3.3.3' });
  return passes(a) && is404(b); });
T('6  ON + temp access → دخول', async () => { gateOn(); store.set('panel_ip:5.5.5.5', JSON.stringify({ expiresAt: Date.now() + 3600000 })); return isLogin(await call({ ip: '5.5.5.5' })); });
T('7  ON + IP بره → 404 + audit + telegram', async () => {
  gateOn(); const r = await call({ ip: '9.9.9.9' });
  return is404(r) && auditHas('panel_ip_rejected') && telegram.some((t) => t.includes('غير مسموح')); });
T('8  ON + إضافة IP للوايت ليست من الشاشة → يتفتح فورًا', async () => {
  gateOn(); const before = await call({ ip: '6.6.6.6' });
  const add = await adminPost('1.1.1.1', { action: 'wl_add', ip: '6.6.6.6', duration: 'perm' });
  const after = await call({ ip: '6.6.6.6' });
  return is404(before) && add.status === 303 && isLogin(after); });
T('9  OFF + IP بره + ADMIN_PASSWORD → OTP يتبعت', async () => {
  const r = await call({ ip: '9.9.9.9', method: 'POST', body: { password: 'adminpass' } });
  return r.status === 200 && r.body.includes('رمز التحقق') && emails.length === 1; });
T('10 ON + whitelist + ADMIN_PASSWORD → OTP يتبعت', async () => {
  gateOn(); store.set('whitelist:4.4.4.4', JSON.stringify({ addedAt: 1 }));
  const r = await call({ ip: '4.4.4.4', method: 'POST', body: { password: 'adminpass' } });
  return r.status === 200 && r.body.includes('رمز التحقق') && emails.length === 1; });
T('11 toggle ON→OFF → كل الناس دخول (+audit +telegram)', async () => {
  gateOn(); const t = await adminPost('1.1.1.1', { action: 'panel_gate_toggle', to: 'off' });
  return t.status === 303 && !store.has('panel_gate:enabled') && isLogin(await call({ ip: '9.9.9.9' }))
    && auditHas('panel_gate_off') && telegram.some((x) => x.includes('اتلغت')); });
T('12 toggle OFF→ON → بره القوايم 404 (+audit +telegram)', async () => {
  const t = await adminPost('1.1.1.1', { action: 'panel_gate_toggle', to: 'on' });
  return t.status === 303 && store.get('panel_gate:enabled') === '1' && is404(await call({ ip: '9.9.9.9' }))
    && auditHas('panel_gate_on') && telegram.some((x) => x.includes('اتفعّلت')); });
T('13 Redis وقع والبوابة ON → stealth (fail-closed): 404', async () => {
  gateOn(); redisDown = true; return is404(await call({ ip: '9.9.9.9' })); });
T('14 IPv6 /64 في whitelist → مفتوحة لنفس الـ /64 بس', async () => {
  gateOn(); await adminPost('1.1.1.1', { action: 'wl_add', ip: '2001:db8:1:2::1', duration: 'perm' });
  const same = await call({ ip: '2001:db8:1:2:aaaa:bbbb:cccc:5' });
  const other = await call({ ip: '2001:db8:1:3::1' });
  return isLogin(same) && is404(other); });
// إضافية
T('15 (إضافي) تفعيل البوابة من IP مش مسموح → مرفوض والحالة ماتتغيرش', async () => {
  const r = await adminPost('9.9.9.9', { action: 'panel_gate_toggle', to: 'on' });
  return r.status === 400 && !store.has('panel_gate:enabled'); });
T('16 (إضافي) ON + IP بره → 404 على POST كمان', async () => {
  gateOn(); return is404(await call({ ip: '9.9.9.9', method: 'POST', body: { password: 'panelpass' } })); });
T('17 (إضافي) ON + IP بره: audit مرة واحدة، تليجرام 5 كحد أقصى', async () => {
  gateOn(); for (let i = 0; i < 8; i++) await call({ ip: '9.9.9.9' });
  const aud = (lists.get('audit:log') || []).filter((x) => JSON.parse(x).a === 'panel_ip_rejected').length;
  return aud === 1 && telegram.filter((t) => t.includes('غير مسموح')).length === 5; });
T('18 (إضافي) ON + blacklist + whitelist → 403 مش login', async () => {
  gateOn(); store.set('whitelist:4.4.4.4', '{"addedAt":1}'); store.set('blacklist:4.4.4.4', '{"reason":"x"}');
  return (await call({ ip: '4.4.4.4' })).status === 403; });

const timed = async (p) => { const t = Date.now(); const r = await p; return [r, Date.now() - t]; };
T('19 (timeout) Redis معلّق → 404 (fail-closed) في ~2.5 ثانية، مش 504', async () => {
  gateOn(); redisDown = 'hang';
  const [r, ms] = await timed(call({ ip: '9.9.9.9' }));
  console.log('     ↳ ' + ms + 'ms');
  return is404(r) && ms >= 2400 && ms < 4000; });
T('20 (timeout) Redis معلّق → الباسورد لوحده 404، لكن الرابط السري بيدخل (303) من غير ما يعتمد على Redis', async () => {
  redisDown = 'hang';
  const [r, ms] = await timed(call({ ip: '9.9.9.9', method: 'POST', body: { password: 'panelpass' } }));
  const [r2, ms2] = await timed(call({ ip: '3.3.3.3', method: 'POST', url: '/api/admin?recovery=' + CODE, body: { password: 'panelpass' } }));
  console.log('     ↳ ' + ms + 'ms / ' + ms2 + 'ms');
  return is404(r) && r2.status === 303 && ms < 4000 && ms2 < 4000; });
T('21 (timeout) Redis معلّق + recovery من RECOVERY_IPS → مش بيتقفل (303 → /api/admin)', async () => {
  gateOn(); redisDown = 'hang';
  const [r, ms] = await timed(call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE }));
  console.log('     ↳ ' + ms + 'ms');
  return passes(r) && ms < 4000; });

let pass = 0;
for (const [n, f] of tests) {
  reset(); let ok = false, err = '';
  try { ok = await f(); } catch (e) { err = ' — ' + e.message; }
  if (ok) pass++;
  console.log((ok ? '✅ ' : '❌ ') + n + err);
}
console.log(`\n${pass}/${tests.length} passed`);
process.exit(pass === tests.length ? 0 : 1);
