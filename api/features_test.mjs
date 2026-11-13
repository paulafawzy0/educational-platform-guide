import crypto from 'crypto';
import fs from 'fs';
import handler from './admin.mjs';

const URL_ = 'https://redis.test';
const CODE = 'R'.repeat(60);
Object.assign(process.env, {
  PANEL_PASSWORD: 'panelpass', ADMIN_PASSWORD: 'adminpass', ADMIN_EMAIL: 'a@b.c', RESEND_API_KEY: 'k',
  OWNER_IPS: '1.1.1.1', PANEL_IPS: '2.2.2.2', RECOVERY_IPS: '3.3.3.3', RECOVERY_CODE: CODE,
  TELEGRAM_Notifications_BOT_TOKEN: 't', TELEGRAM_Notifications_CHAT_ID: 'c', UPSTASH_REDIS_REST_URL: URL_, UPSTASH_REDIS_REST_TOKEN: 'x',
  PUBLIC_API_URL: 'https://x.vercel.app/api/push-send'
});

let store, lists, telegram, emails, redisDown, tg, pushCalls, pushMode;
const PUSH = 'https://x.vercel.app/api/push-send';
const reset = () => { store = new Map(); store.set('panel_mode', 'open'); lists = new Map(); telegram = []; emails = []; redisDown = false; tg = []; pushCalls = []; pushMode = 'ok';
  process.env.ADMIN_SECRET = 'S3CRET'; process.env.SEND_KEY = 'SENDKEY'; process.env.PUBLIC_API_URL = PUSH; process.env.LOG_BOT_TOKEN = 'logtok'; process.env.LOG_CHAT_ID = 'logchat'; };
const glob = (p) => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
function exec(c) {
  const [op, ...a] = c; const O = op.toUpperCase();
  if (O === 'GET') return store.has(a[0]) ? store.get(a[0]) : null;
  if (O === 'SET') { if (a.includes('NX') && store.has(a[0])) return null; store.set(a[0], String(a[1])); return 'OK'; }
  if (O === 'DEL') { return store.delete(a[0]) ? 1 : 0; }
  if (O === 'INCR') { const n = (parseInt(store.get(a[0]) || '0', 10)) + 1; store.set(a[0], String(n)); return n; }
  if (O === 'EXPIRE') return 1;
  if (O === 'LPUSH') { const l = lists.get(a[0]) || []; l.unshift(a[1]); lists.set(a[0], l); return l.length; }
  if (O === 'LTRIM') { const l = lists.get(a[0]) || []; lists.set(a[0], l.slice(+a[1], +a[2] + 1)); return 'OK'; }
  if (O === 'LRANGE') return (lists.get(a[0]) || []).slice(+a[1], +a[2] + 1);
  if (O === 'SCAN') { const re = glob(a[2]); return ['0', [...store.keys()].filter((k) => re.test(k))]; }
  throw new Error('cmd ' + op);
}
globalThis.fetch = async (url, opt = {}) => {
  url = String(url);
  const J = (o) => ({ ok: true, json: async () => o });
  if (url.startsWith('https://api.telegram.org')) { const tx = JSON.parse(opt.body).text; telegram.push(tx); tg.push({ tok: url.match(/bot([^/]+)\//)[1], text: tx }); return J({ ok: true }); }
  if (url === PUSH) {
    pushCalls.push({ auth: opt.headers.Authorization, body: JSON.parse(opt.body) });
    if (pushMode === 'hang') return new Promise((_, rej) => opt.signal.addEventListener('abort', () => rej(new Error('aborted'))));
    if (pushMode === 'err') return { ok: false, status: 403, text: async () => JSON.stringify({ error: 'forbidden' }) };
    if (pushMode === 'html') return { ok: false, status: 500, text: async () => '<h1>boom</h1>' };
    return { ok: true, status: 200, text: async () => JSON.stringify({ sent: 5, failed: 1, matched: 6, total: 10, dry: !!opt.body.includes('"dryRun":true') }) };
  }
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

async function call({ ip, method = 'GET', url = '/api/admin', body, cookie, headers: xh, opts: ho, fn }) {
  const r = { status: 0, body: '', headers: {}, redirect: null };
  const res = {
    setHeader: (k, v) => { r.headers[k.toLowerCase()] = v; }, status(c) { r.status = c; return this; },
    send(b) { r.body = String(b ?? ''); return this; }, end() { return this; },
    redirect(c, u) { r.status = c; r.redirect = u; return this; }
  };
  const headers = { host: 'x.vercel.app', 'x-forwarded-for': ip };
  if (cookie) headers.cookie = cookie;
  if (method === 'POST') headers['sec-fetch-site'] = 'same-origin';
  Object.assign(headers, xh || {});
  await (fn || handler)({ method, url, headers, body, socket: { remoteAddress: ip } }, res, ho);
  return r;
}
const isLogin = (r) => r.status === 401 && r.body.includes('تسجيل الدخول');
const passes = (r) => r.status === 303 && r.headers.location === '/api/admin';
const is404 = (r) => r.status === 404 && r.body.includes('NOT_FOUND');
const isClone = (r) => r.status === 404 && Object.keys(r.headers).sort().join() === 'cache-control,content-type,x-vercel-error,x-vercel-id'
  && r.headers['cache-control'] === 'public, max-age=0, must-revalidate' && r.headers['content-type'] === 'text/plain; charset=utf-8' && r.headers['x-vercel-error'] === 'NOT_FOUND'
  && /^[a-z0-9]+::[a-z]{5}-\d{13}-[0-9a-f]{12}$/.test(r.headers['x-vercel-id'])
  && r.body === 'The page could not be found\n\nNOT_FOUND\n\n' + r.headers['x-vercel-id'] + '\n' && r.body.length === 79;
const withEnv = async (vars, f) => { const old = {}; for (const k of Object.keys(vars)) { old[k] = process.env[k]; process.env[k] = vars[k]; }
  try { return await f(); } finally { for (const k of Object.keys(old)) { if (old[k] === undefined) delete process.env[k]; else process.env[k] = old[k]; } } };
const recCookieOf = (r) => { const c = [].concat(r.headers['set-cookie'] || []).find((x) => x.startsWith('recovery_ok=')); return c ? c.split(';')[0] : ''; };
const gateOn = () => store.set('panel_gate:enabled', '1');
const auditHas = (a) => (lists.get('audit:log') || []).some((x) => JSON.parse(x).a === a);
const adminPost = (ip, body) => call({ ip, method: 'POST', body, cookie: adminCookie() });


const panelCookie = () => { const ts = Date.now().toString();
  return 'panel_auth=' + ts + '.' + crypto.createHmac('sha256', 'panelpass').update(ts).digest('hex'); };
const send = (ip, body, cookie) => call({ ip, method: 'POST', body: { action: 'send_notify', sendKey: 'SENDKEY', ...body }, cookie: cookie === undefined ? panelCookie() : cookie });
const parse = (r) => JSON.parse(r.body);
const auditRows = () => (lists.get('audit:log') || []).map((x) => JSON.parse(x));
const fmtAr = (t) => new Date(t).toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });
const dec = (v) => v.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const trAttrs = (html, attr) => [...html.matchAll(new RegExp('<tr [^>]*' + attr + '="[^>]*>', 'g'))].map((m) => {
  const a = {}; for (const x of m[0].matchAll(/(data-[a-z]+)="([^"]*)"/g)) a[x[1]] = dec(x[2]);
  return { a, style: { display: '' }, getAttribute: (n) => a[n] };
});
// تشغيل سكريبت الصفحة على DOM مزيّف (مفيش متصفح في الـ sandbox) — بنشغّل نفس الكود اللي هيروح للمتصفح
function runPage(html) {
  const scripts = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
  const code = scripts[scripts.length - 1].replace(/^<script>|<\/script>$/g, '');
  const els = {}; const hs = {};
  const docH = {}; let confirmAns = true;
  const mk = (id) => (els[id] = els[id] || { id, value: '', textContent: '', submitted: false, submit() { this.submitted = true; }, addEventListener(ev, f) { (hs[id] = hs[id] || {})[ev] = f; } });
  const au = trAttrs(html, 'data-a'); const pi = trAttrs(html, 'data-mode');
  const document = { getElementById: mk, addEventListener(ev, f) { docH[ev] = f; }, querySelectorAll: (sel) => (sel.indexOf('auTable') > -1 ? au : pi) };
  new Function('document', 'confirm', code)(document, () => confirmAns);
  const fire = (id, ev) => hs[id][ev]();
  return { els, au, pi, fire, setConfirm: (v) => { confirmAns = v; }, click: (act, ip) => docH.click({ target: { closest: () => ({ getAttribute: (n) => (n === 'data-act' ? act : ip) }) } }), visAu: () => au.filter((r) => r.style.display !== 'none'), visPi: () => pi.filter((r) => r.style.display !== 'none') };
}
const adminPage = async (ip = '1.1.1.1') => (await call({ ip, cookie: adminCookie() })).body;

const tests = [];
const T = (n, f) => tests.push([n, f]);

T('N1 audit: 1000 صف (من 1200) + "إجمالي" من audit:total + LTRIM على 1000 + العدّاد بيزيد', async () => {
  lists.set('audit:log', Array.from({ length: 1200 }, (_, i) => JSON.stringify({ t: Date.now() - i * 1000, a: 'login_ok', ip: '9.9.9.9' })));
  store.set('audit:total', '5000');
  const html = await adminPage();
  const rows = (html.match(/<tr data-a=/g) || []).length;
  await adminPost('1.1.1.1', { action: 'wl_add', ip: '6.6.6.6', duration: 'perm' });
  return rows === 1000 && html.includes('آخر 1000 عملية — إجمالي 5000') && lists.get('audit:log').length === 1000 && store.get('audit:total') === '5001'; });

T('N2 فلترة audit client-side (IP جزئي / العملية / من-إلى تاريخ / مسح الفلتر) على DOM مزيّف', async () => {
  const mkr = (iso, a, ip, x = {}) => JSON.stringify({ t: Date.parse(iso), a, ip, ...x });
  lists.set('audit:log', [
    mkr('2026-11-09T12:00:00Z', 'login_ok', '10.0.0.5'), mkr('2026-11-05T12:00:00Z', 'wl_add_x', '10.0.0.7'),
    mkr('2026-11-05T13:00:00Z', 'login_fail', '192.168.1.9'), mkr('2026-11-01T12:00:00Z', 'login_fail', '10.0.0.5', { target: '77.7.7.7' })]);
  const pg = runPage(await adminPage());
  const all = pg.visAu().length;
  pg.els.fIp.value = '10.0.0'; pg.fire('fIp', 'input'); const byIp = pg.visAu().length;
  pg.els.fIp.value = ''; pg.els.fAct.value = 'login_fail'; pg.fire('fAct', 'change'); const byAct = pg.visAu().length;
  pg.els.fAct.value = ''; pg.els.fFrom.value = '2026-11-02'; pg.els.fTo.value = '2026-11-06'; pg.fire('fFrom', 'change'); const byDate = pg.visAu().length;
  pg.els.fIp.value = '10.0.0'; pg.fire('fIp', 'input'); const combo = pg.visAu().length;
  pg.fire('fClear', 'click'); const cleared = pg.visAu().length;
  pg.els.fIp.value = '77.7.7'; pg.fire('fIp', 'input'); const byTarget = pg.visAu().length;
  return all === 4 && byIp === 3 && byAct === 2 && byDate === 2 && combo === 1 && cleared === 4 && pg.els.fCount.textContent === 1 && byTarget === 1; });

T('N3 عدّاد الإشعارات: notif + notif:last + notif:detail (IPv6 على /64)', async () => {
  await send('9.9.9.9', { title: 'T1', body: 'B', dept: 'cs', section: '3', course: 'نظم التشغيل', instructor: 'م/ احمد', classType: 'lab' });
  await send('9.9.9.9', { title: 'T2', body: 'B' });
  const d = JSON.parse(store.get('notif:detail:9.9.9.9'));
  await send('2001:db8:1:2:aaaa::1', { title: 'V6', body: 'B' });
  await send('2001:db8:1:2:bbbb::9', { title: 'V6b', body: 'B' });
  return store.get('notif:9.9.9.9') === '2' && !!parseInt(store.get('notif:last:9.9.9.9'), 10) && d.title === 'T2' && d.sent === 5 && typeof d.ts === 'number'
    && store.get('notif:2001:db8:1:2::') === '2'; });

T('N4 قسم "الإشعارات المرسلة لكل IP": IP + عدد + آخر إشعار + ترتيب تنازلي + حد 50', async () => {
  for (let i = 1; i <= 60; i++) { store.set('notif:20.0.0.' + i, String(i)); store.set('notif:last:20.0.0.' + i, String(Date.now())); store.set('notif:detail:20.0.0.' + i, JSON.stringify({ title: 'عنوان' + i, dept: 'cs', sent: i })); }
  const html = await adminPage();
  const sec = html.split('الإشعارات المرسلة لكل IP</h2>')[1].split('<h2')[0];
  const ips = [...sec.matchAll(/<tr><td dir="ltr">([\d.]+)/g)].map((m) => m[1]);
  return ips.length === 50 && ips[0] === '20.0.0.60' && ips[49] === '20.0.0.11' && sec.includes('عنوان60') && !sec.includes('notif:last') && ips.every((x, i) => i === 0 || +x.split('.')[3] < +ips[i - 1].split('.')[3]); });

T('N5 Panel IPs: عدد الإشعارات + آخر نشاط (الأحدث من notif/login_ok) + عدّاد دائم/مؤقت/منتهي', async () => {
  const tN = Date.now() - 3600000, tL = Date.now() - 600000;
  store.set('panel_ip:7.7.7.7', '{"addedAt":1}'); store.set('panel_ip:7.7.7.8', JSON.stringify({ expiresAt: Date.now() + 3600000 })); store.set('panel_ip:7.7.7.9', JSON.stringify({ expiresAt: Date.now() - 3600000 }));
  store.set('notif:7.7.7.7', '4'); store.set('notif:last:7.7.7.7', String(tN));
  store.set('notif:7.7.7.8', '2'); store.set('notif:last:7.7.7.8', String(tN));
  lists.set('audit:log', [JSON.stringify({ t: tL, a: 'login_ok', ip: '7.7.7.8' })]);
  const html = await adminPage();
  const rowOf = (ip) => html.split('<tr data-pip="' + ip + '"')[1].split('</tr>')[0];
  return html.includes('1 دائم (من 10) — 1 مؤقت — 1 منتهي') && rowOf('7.7.7.7').includes('<td>4</td>') && rowOf('7.7.7.7').includes(fmtAr(tN))
    && rowOf('7.7.7.8').includes(fmtAr(tL)) && !rowOf('7.7.7.8').includes(fmtAr(tN)) && rowOf('7.7.7.9').includes('(منتهي)'); });

T('N6 فلترة Panel IPs: دائم/مؤقت/بحث IP', async () => {
  store.set('panel_ip:7.7.7.7', '{"addedAt":1}'); store.set('panel_ip:7.7.7.8', JSON.stringify({ expiresAt: Date.now() + 3600000 })); store.set('panel_ip:8.8.8.8', '{"addedAt":1}');
  const pg = runPage(await adminPage());
  const all = pg.visPi().length;
  pg.els.pMode.value = 'perm'; pg.fire('pMode', 'change'); const perm = pg.visPi().map((r) => r.a['data-pip']).sort().join();
  pg.els.pMode.value = 'temp'; pg.fire('pMode', 'change'); const temp = pg.visPi().map((r) => r.a['data-pip']).join();
  pg.els.pMode.value = ''; pg.els.pIp.value = '8.8'; pg.fire('pIp', 'input'); const q = pg.visPi().map((r) => r.a['data-pip']).join();
  return all === 3 && perm === '7.7.7.7,8.8.8.8' && temp === '7.7.7.8' && q === '8.8.8.8'; });

T('N7 زر "مسح المنتهية": العرض مابيمسحش، الزر بيمسح المنتهي بس، والمنتهي لسه مرفوض', async () => {
  store.set('panel_ip:7.7.7.8', JSON.stringify({ expiresAt: Date.now() + 3600000 })); store.set('panel_ip:7.7.7.9', JSON.stringify({ expiresAt: Date.now() - 3600000 }));
  await adminPage();
  const kept = store.has('panel_ip:7.7.7.9');
  gateOn(); const stillRejected = is404(await call({ ip: '7.7.7.9' }));
  store.set('panel_ip:7.7.7.9', JSON.stringify({ expiresAt: Date.now() - 3600000 }));   // getTempAccess مسحته أول ما اتفحص — بنرجّعه عشان نجرب الزر
  const r = await adminPost('1.1.1.1', { action: 'panel_ip_purge' });
  return kept && stillRejected && r.status === 303 && !store.has('panel_ip:7.7.7.9') && store.has('panel_ip:7.7.7.8') && auditRows().some((x) => x.a === 'panel_ip_purge' && x.count === 1); });

T('N8 التوجيه: notifyLog → LOG_BOT، notifyTelegram → البوت الأمني', async () => {
  await adminPost('1.1.1.1', { action: 'wl_add', ip: '6.6.6.6', duration: 'perm' });
  await adminPost('1.1.1.1', { action: 'panel_gate_toggle', to: 'on' });
  const logOps = tg.filter((x) => x.tok === 'logtok').map((x) => x.text).join('|');
  gateOn(); await call({ ip: '9.9.9.9' });
  await call({ ip: '9.9.9.9', method: 'POST', body: { password: 'bad' } });
  const sec = tg.filter((x) => x.tok === 't').map((x) => x.text).join('|');
  return logOps.includes('اتضاف للوايت ليست') && logOps.includes('اتفعّلت') && !tg.some((x) => x.tok === 't' && x.text.includes('اتضاف للوايت'))
    && sec.includes('غير مسموح') && !tg.some((x) => x.tok === 'logtok' && x.text.includes('غير مسموح')); });

T('N9 fallback: LOG_BOT_TOKEN فاضي → الرسالة تروح للبوت الأمني', async () => {
  process.env.LOG_BOT_TOKEN = '';
  await adminPost('1.1.1.1', { action: 'wl_add', ip: '6.6.6.6', duration: 'perm' });
  const a = tg.some((x) => x.tok === 't' && x.text.includes('اتضاف للوايت ليست')) && !tg.some((x) => x.tok === 'logtok');
  reset(); process.env.LOG_CHAT_ID = '';
  await adminPost('1.1.1.1', { action: 'wl_add', ip: '6.6.6.6', duration: 'perm' });
  return a && tg.some((x) => x.tok === 't' && x.text.includes('اتضاف للوايت ليست')); });

T('N10a send_notify: panel_auth ✔ / admin_auth ✔ / بدون auth 401 / كوكي غلط 401', async () => {
  const a = await send('9.9.9.9', { title: 'x', body: 'y' });
  const b = await send('9.9.9.9', { title: 'x', body: 'y' }, adminCookie());
  const c = await send('9.9.9.9', { title: 'x', body: 'y' }, '');
  const d = await send('9.9.9.9', { title: 'x', body: 'y' }, 'panel_auth=1.abcd');
  return a.status === 200 && parse(a).sent === 5 && b.status === 200 && c.status === 401 && d.status === 401 && pushCalls.length === 2; });

T('N10b send_notify: title/body فاضي → 400 (ومفيش اتصال بـ push-send)', async () => {
  const r = [await send('9.9.9.9', { title: '', body: 'y' }), await send('9.9.9.9', { title: 'x', body: '   ' }), await send('9.9.9.9', { body: 'y' }), await send('9.9.9.9', { title: 'x'.repeat(201), body: 'y' })];
  return r.every((x) => x.status === 400) && pushCalls.length === 0; });

T('N10c send_notify: dryRun → notif_dry، مفيش عدّاد، 🧪 نعم', async () => {
  const r = await send('9.9.9.9', { title: 'تجربة', body: 'y', dryRun: true });
  return r.status === 200 && auditRows().some((x) => x.a === 'notif_dry') && !auditRows().some((x) => x.a === 'notif_sent')
    && !store.has('notif:9.9.9.9') && tg.some((x) => x.tok === 'logtok' && x.text.includes('🧪 تجربة: نعم')) && pushCalls[0].body.dryRun === true; });

T('N10d send_notify: إرسال فعلي → notif_sent + عدّاد + الـ proxy بيبعت السر من env بس', async () => {
  const r = await send('9.9.9.9', { title: 'حقيقي', body: 'نص\n\nسطرين', dept: 'cs', evil: 'x', action2: 'y' });
  const row = auditRows().find((x) => x.a === 'notif_sent');
  const c = pushCalls[0];
  return r.status === 200 && !!row && row.res.includes('وصل 5') && store.get('notif:9.9.9.9') === '1' && c.auth === 'Bearer S3CRET'
    && c.body.body === 'نص\n\nسطرين' && !('evil' in c.body) && !('action' in c.body) && !r.body.includes('S3CRET'); });

T('N10e send_notify: ADMIN_SECRET أو PUBLIC_API_URL فاضي → 500', async () => {
  process.env.ADMIN_SECRET = ''; const a = await send('9.9.9.9', { title: 'x', body: 'y' });
  process.env.ADMIN_SECRET = 'S3CRET'; process.env.PUBLIC_API_URL = ''; const b = await send('9.9.9.9', { title: 'x', body: 'y' });
  return a.status === 500 && b.status === 500 && pushCalls.length === 0 && !store.has('notif:9.9.9.9'); });

T('N10f send_notify: رد push-send غير 2xx بيعدي زي ما هو، والعدّاد مايزيدش، وPlain-text بيتغلف JSON', async () => {
  pushMode = 'err'; const a = await send('9.9.9.9', { title: 'x', body: 'y' });
  pushMode = 'html'; const b = await send('9.9.9.9', { title: 'x', body: 'y' });
  return a.status === 403 && parse(a).error === 'forbidden' && b.status === 500 && typeof parse(b).error === 'string' && !store.has('notif:9.9.9.9')
    && tg.some((x) => x.tok === 'logtok' && x.text.includes('❌ خطأ: 403')); });

T('N11 سقف 30/ساعة: #31 → 429 + تنبيه أمني، dryRun مش بيتحسب، OWNER معفي', async () => {
  const codes = []; for (let i = 0; i < 31; i++) codes.push((await send('9.9.9.9', { title: 'x' + i, body: 'y' })).status);
  const dry = await send('9.9.9.9', { title: 'd', body: 'y', dryRun: true });
  const secAlert = tg.some((x) => x.tok === 't' && x.text.includes('30/ساعة'));
  const other = await send('9.9.9.10', { title: 'x', body: 'y' });
  let ownerOk = true; for (let i = 0; i < 35; i++) ownerOk = ownerOk && (await send('1.1.1.1', { title: 'o' + i, body: 'y' })).status === 200;
  return codes.slice(0, 30).every((c) => c === 200) && codes[30] === 429 && dry.status === 200 && secAlert && other.status === 200 && ownerOk && store.get('notif:9.9.9.9') === '30'; });

T('N12 رسالة الـ Log Bot فيها IP + dept + section + course + classType + instructor + title + النتيجة', async () => {
  await send('9.9.9.9', { title: 'عنوان الإشعار', body: 'نص طويل جدًا لازم مايظهرش', dept: 'cs', section: '3', course: 'نظم التشغيل', classType: 'lab', instructor: 'م/ احمد' });
  const m = tg.find((x) => x.tok === 'logtok' && x.text.includes('📤 إشعار جديد')).text;
  return ['👤 IP: 9.9.9.9', 'القسم: cs', 'السكشن: 3', 'المادة: نظم التشغيل', 'النوع: lab', 'المعيد: م/ احمد', 'العنوان: عنوان الإشعار', '✅ وصل: 5 | ❌ فشل: 1 | 🎯 مطابق: 6', '🧪 تجربة: لا'].every((x) => m.includes(x))
    && !m.includes('لازم مايظهرش'); });

T('N13+N14 الرسالة ≤ 500 حرف والنص الطويل بيتقطع بـ "..."', async () => {
  await send('9.9.9.9', { title: 'ع'.repeat(200), body: 'y', dept: 'd'.repeat(30), section: 's'.repeat(100), course: 'c'.repeat(100), classType: 'k'.repeat(100), instructor: 'i'.repeat(100) });
  const m = tg.find((x) => x.tok === 'logtok' && x.text.includes('📤 إشعار جديد')).text;
  const title = m.split('\n').find((l) => l.startsWith('📝'));
  // notifyLog نفسها: أي رسالة أطول من 500 بتتقطع
  reset(); await adminPost('1.1.1.1', { action: 'bl_add', ip: '8.8.8.8', reason: 'r'.repeat(300) });
  const m2 = tg.find((x) => x.tok === 'logtok').text;
  return m.length <= 500 && title.endsWith('...') && m2.length <= 500; });

T('N15 PANEL_HTML اتغير في send() + قسم الإعدادات (حقل SEND_KEY والـ hint) بس — diff -U0 على كل hunk', async () => {
  const cp = await import('child_process');
  const grab = (f, name) => { const src = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n'); const st = src.indexOf('const ' + name + ' = `'); const a = src.indexOf('`', st) + 1; return src.slice(a, src.indexOf('`;', a)); };
  fs.writeFileSync('/tmp/p_old.txt', grab('./admin.v2.mjs', 'PANEL_HTML')); fs.writeFileSync('/tmp/p_new.txt', grab('./admin.mjs', 'PANEL_HTML'));
  const out = cp.spawnSync('diff', ['-U0', '/tmp/p_old.txt', '/tmp/p_new.txt'], { encoding: 'utf8' }).stdout;
  const old = fs.readFileSync('/tmp/p_old.txt', 'utf8').split('\n');
  const sendStart = old.findIndex((l) => l.startsWith('function send(')) + 1, sendEnd = old.findIndex((l) => l.startsWith('function copyPowerShell(')); // 1-indexed
  const setStart = old.findIndex((l) => l.includes('كلمة سر الإرسال (ADMIN_SECRET)')) + 1;
  const setEnd = old.findIndex((l) => l.includes('class="hint">⚠️ كلمة السر دي')) + 1;
  const hunks = [...out.matchAll(/^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/gm)].map((m) => [+m[1], m[2] === undefined ? 1 : +m[2]]);
  const within = (a, c, lo, hi) => (c === 0 ? a >= lo && a <= hi : a >= lo && a + c - 1 <= hi);
  const kinds = hunks.map(([a, c]) => (within(a, c, sendStart, sendEnd) ? 'send' : within(a, c, setStart, setEnd) ? 'settings' : 'OTHER'));
  console.log('     ↳ hunks: ' + kinds.join(', '));
  return hunks.length > 0 && kinds.every((k) => k !== 'OTHER') && kinds.includes('send') && kinds.includes('settings'); });

T('N16 hash: LOGIN_HTML متطابق (4dfc28a6…) وPANEL_HTML اتغير', async () => {
  const h = (f, name) => { const src = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n'); const st = src.indexOf('const ' + name + ' = `'); const a = src.indexOf('`', st) + 1; return crypto.createHash('sha256').update(src.slice(a, src.indexOf('`;', a))).digest('hex'); };
  return h('./admin.mjs', 'LOGIN_HTML') === '4dfc28a6a2ea3e237e41bc1db8d08b6ed5ee992c9194cff3ef6034f2c14de9d2' && h('./admin.mjs', 'PANEL_HTML') !== h('./admin.v2.mjs', 'PANEL_HTML'); });

T('N17 rate limit GET (100/دقيقة) → 429 + تنبيه أمني rate_limit', async () => {
  let last; for (let i = 0; i < 101; i++) last = await call({ ip: '9.9.9.9' });
  return last.status === 429 && auditRows().some((x) => x.a === 'rate_limit') && tg.some((x) => x.tok === 't' && x.text.includes('100/دقيقة')); });

T('N18 Redis معلّق: كل حاجة 404 (fail-closed) حتى إرسال الإشعارات، ومفيش اتصال بـ push-send', async () => {
  redisDown = 'hang'; const t0 = Date.now(); const r = await send('9.9.9.9', { title: 'x', body: 'y' }); const ms = Date.now() - t0;
  console.log('     ↳ ' + ms + 'ms');
  return is404(r) && pushCalls.length === 0 && ms < 4000; });

T('N19 push-send معلّق → 504 بعد 25 ثانية (timeout الـ proxy)', async () => {
  pushMode = 'hang'; const t0 = Date.now(); const r = await send('9.9.9.9', { title: 'x', body: 'y' }); const ms = Date.now() - t0;
  console.log('     ↳ ' + ms + 'ms');
  return r.status === 504 && ms >= 24900 && ms < 27000 && !store.has('notif:9.9.9.9'); });

T('N20 صفحة اللوحة المخدومة: سكريبت صالح syntactically، send() بيستخدم /api/admin ومفيهوش Authorization/ADMIN_SECRET', async () => {
  const r = await call({ ip: '9.9.9.9', cookie: panelCookie() });
  const code = r.body.match(/<script>([\s\S]*?)<\/script>/)[1];
  new Function(code);   // فحص صيغة فقط (مابيشغّلش)
  const sendFn = code.slice(code.indexOf('function send('), code.indexOf('function copyPowerShell('));
  return r.status === 200 && sendFn.includes("fetch('/api/admin'") && sendFn.includes("action: 'send_notify'") && !sendFn.includes('Authorization') && !sendFn.includes('secret') && sendFn.includes("getVal('sendKey')") && sendFn.includes('payload.sendKey')
    && code.includes('function copyPowerShell(') && code.includes("getVal('secret')"); });

T('N21 IP مجهول/فاضي → 400 (مفيش ban:unknown ولا ban: بيتكتب)', async () => {
  const r = [await call({ ip: '' }), await call({ ip: 'unknown' }), await call({ ip: '', method: 'POST', body: { password: 'bad' } })];
  for (let i = 0; i < 6; i++) await call({ ip: 'unknown', method: 'POST', body: { password: 'bad' } });
  return r.every((x) => x.status === 400) && ![...store.keys()].some((k) => k === 'ban:' || k === 'ban:unknown'); });

T('N22 banKey على /64: 5 غلط من IPv6 → نفس الـ /64 يتقفل حتى بالباسورد الصح، و/64 تاني لأ', async () => {
  for (let i = 0; i < 5; i++) await call({ ip: '2001:db8:5:6::1', method: 'POST', body: { password: 'bad' } });
  const same = await call({ ip: '2001:db8:5:6:ffff:ffff:ffff:ffff', method: 'POST', body: { password: 'panelpass' } });
  const other = await call({ ip: '2001:db8:5:7::1', method: 'POST', body: { password: 'panelpass' } });
  return store.has('ban:2001:db8:5:6::') && ![...store.keys()].some((k) => k.startsWith('ban:2001:db8:5:6::1')) && same.status === 429 && other.status === 303; });

T('N23 CORS: مفيش Access-Control-Allow-Origin إلا لـ ALLOWED_ORIGIN بالظبط (مفيش *)', async () => {
  const hdr = async (origin) => { const r = { headers: {} }; const res = { setHeader: (k, v) => { r.headers[k.toLowerCase()] = v; }, status() { return this; }, send() { return this; }, end() { return this; }, redirect() { return this; } };
    await handler({ method: 'GET', url: '/api/admin', headers: { host: 'x.vercel.app', 'x-forwarded-for': '9.9.9.9', ...(origin ? { origin } : {}) }, socket: {} }, res); return r.headers; };
  delete process.env.ALLOWED_ORIGIN;
  const a = await hdr(); const b = await hdr('https://evil.com');
  process.env.ALLOWED_ORIGIN = 'https://ok.example';
  const c = await hdr('https://ok.example'); const d = await hdr('https://evil.com');
  const opt = await call({ ip: '9.9.9.9', method: 'OPTIONS' });
  delete process.env.ALLOWED_ORIGIN;
  return !('access-control-allow-origin' in a) && !('access-control-allow-origin' in b) && c['access-control-allow-origin'] === 'https://ok.example' && !('access-control-allow-origin' in d) && opt.status === 403; });

T('N24 security headers على الردود العادية (XFO / CSP / HSTS / nosniff / ...)، والـ 404 مقلّد Vercel من غير أي header بتاعنا', async () => {
  gateOn();
  const ok = await call({ ip: '2.2.2.2' }); const nf = await call({ ip: '9.9.9.9' });
  const good = (h) => h['x-frame-options'] === 'DENY' && /default-src 'none'/.test(h['content-security-policy']) && /frame-ancestors 'none'/.test(h['content-security-policy']) && /max-age=\d+/.test(h['strict-transport-security'])
    && h['x-content-type-options'] === 'nosniff' && h['referrer-policy'] === 'no-referrer' && /no-store/.test(h['cache-control']) && /noindex/.test(h['x-robots-tag']);
  return is404(nf) && good(ok.headers) && isClone(nf); });

T('N25 الـ hint الجديد ظاهر في اللوحة والقديم اختفى', async () => {
  const r = await call({ ip: '9.9.9.9', cookie: panelCookie() });
  return r.body.includes('كلمة السر دي للـ PowerShell بس. الـ proxy بيستخدم ADMIN_SECRET من السيرفر.') && !r.body.includes('بتتبعت مع الإشعار'); });

T('N26 SEND_KEY: بدون/غلط → 401، السيرفر من غير SEND_KEY → 500، dryRun من غير مفتاح → 200، الصح → 200', async () => {
  const none = await send('9.9.9.9', { title: 'x', body: 'y', sendKey: undefined });
  const bad = await send('9.9.9.9', { title: 'x', body: 'y', sendKey: 'nope' });
  const empty = await send('9.9.9.9', { title: 'x', body: 'y', sendKey: '' });
  const dry = await send('9.9.9.9', { title: 'x', body: 'y', dryRun: true, sendKey: undefined });
  const pushedBefore = pushCalls.length;
  const good = await send('9.9.9.9', { title: 'x', body: 'y' });
  process.env.SEND_KEY = ''; const noEnv = await send('9.9.9.9', { title: 'x', body: 'y' }); const noEnvDry = await send('9.9.9.9', { title: 'x', body: 'y', dryRun: true, sendKey: undefined });
  return none.status === 401 && bad.status === 401 && empty.status === 401 && dry.status === 200 && pushedBefore === 1 && good.status === 200
    && noEnv.status === 500 && noEnvDry.status === 200 && pushCalls.length === 3; });

T('N27 SEND_KEY: 5 غلط → قفل ساعة (حتى بالصح)، OWNER مش بيتقفل، تنبيه أمني، ومفيش تسريب (push-send بياخد ADMIN_SECRET مش SEND_KEY)', async () => {
  const codes = []; for (let i = 0; i < 5; i++) codes.push((await send('9.9.9.9', { title: 'x', body: 'y', sendKey: 'wrongkey' + i })).status);
  const locked = await send('9.9.9.9', { title: 'x', body: 'y' });
  const dryOk = await send('9.9.9.9', { title: 'x', body: 'y', dryRun: true, sendKey: undefined });
  const ownerCodes = []; for (let i = 0; i < 7; i++) ownerCodes.push((await send('1.1.1.1', { title: 'x', body: 'y', sendKey: 'bad' })).status);
  const ownerGood = await send('1.1.1.1', { title: 'x', body: 'y' });
  await send('9.9.9.10', { title: 'leak', body: 'y' });
  const everything = JSON.stringify([tg, auditRows(), pushCalls.map((c) => c.body)]);
  return codes.every((c) => c === 401) && locked.status === 429 && dryOk.status === 200 && ownerCodes.every((c) => c === 401) && ownerGood.status === 200
    && tg.some((x) => x.tok === 't' && x.text.includes('مفتاح إرسال غلط')) && auditRows().some((x) => x.a === 'sendkey_fail')
    && !everything.includes('SENDKEY') && !everything.includes('wrongkey') && pushCalls.every((c) => c.auth === 'Bearer S3CRET'); });

T('N28 السقف بيعد النجاح بس: 35 فشل مابيخصموش، بعدها 30 نجاح، #31 → 429، التجارب مش بتتحسب', async () => {
  pushMode = 'err'; let fails = 0; for (let i = 0; i < 35; i++) if ((await send('9.9.9.9', { title: 'f' + i, body: 'y' })).status === 403) fails++;
  const afterFail = store.get('notif_rate:9.9.9.9:' + Math.floor(Date.now() / 3600000));
  pushMode = 'ok'; const ok = []; for (let i = 0; i < 30; i++) ok.push((await send('9.9.9.9', { title: 's' + i, body: 'y' })).status);
  const over = await send('9.9.9.9', { title: 'over', body: 'y' });
  const dry = await send('9.9.9.9', { title: 'd', body: 'y', dryRun: true });
  return fails === 35 && afterFail === undefined && ok.every((c) => c === 200) && over.status === 429 && dry.status === 200
    && store.get('notif_rate:9.9.9.9:' + Math.floor(Date.now() / 3600000)) === '30' && store.get('notif:9.9.9.9') === '30'; });

T('M1 stealth: كل الناس 404 مقلّد (whitelist / PANEL_IPS / OWNER / temp / كوكي لوحة وأدمن صالح) على GET و POST، من غير Set-Cookie', async () => {
  store.set('panel_mode', 'stealth'); store.set('whitelist:4.4.4.4', '{"addedAt":1}'); store.set('panel_ip:5.5.5.5', JSON.stringify({ expiresAt: Date.now() + 3600000 }));
  const rs = [];
  for (const ip of ['9.9.9.9', '4.4.4.4', '2.2.2.2', '1.1.1.1', '5.5.5.5']) {
    rs.push(await call({ ip })); rs.push(await call({ ip, method: 'POST', body: { password: 'panelpass' } }));
    rs.push(await call({ ip, cookie: panelCookie() })); rs.push(await call({ ip, cookie: adminCookie() })); rs.push(await send(ip, { title: 'x', body: 'y' }));
  }
  return rs.length === 25 && rs.every(isClone) && pushCalls.length === 0; });

T('M2 الافتراضي fail-closed: مفتاح مش موجود / قيمة غريبة / Redis وقع / Redis معلّق → 404، و open بس بيفتح', async () => {
  store.delete('panel_mode'); const a = await call({ ip: '9.9.9.9' });
  store.set('panel_mode', 'OPEN '); const b = await call({ ip: '9.9.9.9' });
  store.set('panel_mode', 'true'); const c = await call({ ip: '9.9.9.9' });
  store.set('panel_mode', 'open'); const d = await call({ ip: '9.9.9.9' });
  redisDown = true; const e2 = await call({ ip: '9.9.9.9' });
  return isClone(a) && isClone(b) && isClone(c) && isLogin(d) && isClone(e2); });

T('M3 الرابط السري في stealth: بيفتح من أي IP (RECOVERY_IPS مش متظبطة)، الكوكي بيكمّل حتى لو الـ IP اتغير، كود غلط/كوكي قديم → 404', async () => withEnv({ RECOVERY_IPS: '' }, async () => {
  store.set('panel_mode', 'stealth');
  const bad = await call({ ip: '9.9.9.8', url: '/api/admin?recovery=WRONG' });
  const r1 = await call({ ip: '5.5.5.5', url: '/api/admin?recovery=' + CODE });
  const ck = recCookieOf(r1);
  const next = await call({ ip: '5.5.5.5', cookie: ck });
  const post = await call({ ip: '5.5.5.5', method: 'POST', body: { password: 'panelpass' }, cookie: ck });
  const otherIp = await call({ ip: '6.6.6.6', cookie: ck });
  const ts = String(Date.now() - 8 * 86400000); const old = 'recovery_ok=' + ts + '.' + crypto.createHmac('sha256', CODE).update('recovery.' + ts + '.*').digest('hex');
  const stale = await call({ ip: '5.5.5.5', cookie: old });
  return isClone(bad) && passes(r1) && !!ck && isLogin(next) && post.status === 303 && isLogin(otherIp) && isClone(stale) && auditRows().some((x) => x.a === 'recovery_used'); }));

T('M4 RECOVERY_IPS اختيارية: متظبطة → IP تاني (بكود صح) 404 + حظر دائم، كلها غلط → مقفول من غير حظر، فاضية → الكود لوحده يكفي', async () => {
  store.set('panel_mode', 'stealth');
  const url = '/api/admin?recovery=' + CODE;
  const set = await withEnv({ RECOVERY_IPS: '3.3.3.3' }, async () => [await call({ ip: '3.3.3.3', url }), await call({ ip: '5.5.5.5', url })]);
  const bannedOther = store.get('ban:5.5.5.5') && JSON.parse(store.get('ban:5.5.5.5')).level === 'perm';
  const bad = await withEnv({ RECOVERY_IPS: 'not-an-ip' }, async () => call({ ip: '3.3.3.9', url }));
  const noBanOnMisconfig = !store.has('ban:3.3.3.9');
  const none = await withEnv({ RECOVERY_IPS: '' }, async () => call({ ip: '5.5.5.6', url }));
  return passes(set[0]) && isClone(set[1]) && bannedOther && isClone(bad) && noBanOnMisconfig && passes(none)
    && tg.some((x) => x.tok === 't' && x.text.includes('حظر دائم') && x.text.includes('مش في RECOVERY_IPS')); });

T('M5 السقف العام: 100 محاولة فاشلة تحت الـ recovery (على 10 IPs) → الـ recovery بيتقفل للكل + تنبيه، وتغيير الكود بيصفّره', async () => withEnv({ RECOVERY_IPS: '' }, async () => {
  store.set('panel_mode', 'stealth'); const url = '/api/admin?recovery=' + CODE; const codes = [];
  for (let k = 1; k <= 10; k++) for (let i = 0; i < 10; i++) codes.push((await call({ ip: '11.0.0.' + k, method: 'POST', url, body: { password: 'wrong' } })).status);
  const after = await call({ ip: '11.0.0.50', url });
  const alerted = tg.some((x) => x.tok === 't' && x.text.includes('سقف محاولات الـ recovery'));
  const NEWCODE = 'N'.repeat(60);
  const rotated = await withEnv({ RECOVERY_CODE: NEWCODE }, async () => call({ ip: '11.0.0.50', url: '/api/admin?recovery=' + NEWCODE }));
  return codes.length === 100 && codes.every((c) => c === 401) && isClone(after) && alerted && auditRows().some((x) => x.a === 'recovery_cap') && passes(rotated); }));

T('M6 زر التبديل: open→stealth (تنبيه على البوت الأمني + audit)، العامة 404، والرجوع لـ open من جلسة recovery + أدمن', async () => {
  const page = await adminPage(); const inOpen = page.includes('وضع اللوحة (Kill Switch)') && page.includes('🟢 open') && page.includes('تحويل لـ stealth') && page.includes('هيبقى 404');
  const t1 = await adminPost('1.1.1.1', { action: 'panel_mode_toggle', to: 'stealth' });
  const secMsg = tg.some((x) => x.tok === 't' && x.text.includes('stealth')) && !tg.some((x) => x.tok === 'logtok' && x.text.includes('stealth'));
  const pub = await call({ ip: '9.9.9.9' }); const ownerNow = await call({ ip: '1.1.1.1', cookie: adminCookie() });
  const rec = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE, cookie: adminCookie() }); const rc = recCookieOf(rec);
  const pageS = await call({ ip: '3.3.3.3', cookie: adminCookie() + '; ' + rc });
  const t2 = await call({ ip: '3.3.3.3', method: 'POST', body: { action: 'panel_mode_toggle', to: 'open' }, cookie: adminCookie() + '; ' + rc });
  return (inOpen && t1.status === 303 && secMsg && isClone(pub) && isClone(ownerNow) && pageS.body.includes('🔴 stealth')
    && pageS.body.includes('تحويل لـ open') && t2.status === 303 && store.get('panel_mode') === 'open' && isLogin(await call({ ip: '9.9.9.9' }))
    && auditRows().some((x) => x.a === 'panel_mode_stealth') && auditRows().some((x) => x.a === 'panel_mode_open')); });

T('M7 stealth بيتفحص قبل OPTIONS و POST cross-site (404 مقلّد مش 403/204)، وفي open الوضع القديم زي ما هو', async () => {
  store.set('panel_mode', 'stealth');
  const o = await call({ ip: '9.9.9.9', method: 'OPTIONS' }); const x = await call({ ip: '9.9.9.9', method: 'POST', body: { password: 'p' }, headers: { 'sec-fetch-site': 'cross-site' } });
  store.set('panel_mode', 'open');
  const o2 = await call({ ip: '9.9.9.9', method: 'OPTIONS' }); const x2 = await call({ ip: '9.9.9.9', method: 'POST', body: { password: 'p' }, headers: { 'sec-fetch-site': 'cross-site' } });
  return isClone(o) && isClone(x) && o2.status === 403 && x2.status === 403; });

T('M8 بوابة الـ IPs: نفس الـ 404 المقلّد (من غير headers بتاعتنا ولا مسح كوكي حتى لو الطلب جاي بكوكي)', async () => {
  gateOn(); const r = await call({ ip: '9.9.9.9', cookie: 'admin_auth=x; panel_auth=y' });
  return isClone(r) && !('set-cookie' in r.headers); });

T('M9 deploy جديد (مفيش panel_mode): الـ owner نفسه 404 والرابط السري بيدخل', async () => {
  store.delete('panel_mode');
  const o = await call({ ip: '1.1.1.1' }); const r = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE });
  return isClone(o) && passes(r); });

T('M10 الكوكي (7 أيام) بيتجدد مع كل طلب سليم وبيفضل مفيد بعد تغيير الـ IP؛ والمنتهي أو بتوقيع غلط → 404', async () => withEnv({ RECOVERY_IPS: '' }, async () => {
  store.set('panel_mode', 'stealth');
  const mk = (ageMs, code = CODE) => { const ts = String(Date.now() - ageMs); return 'recovery_ok=' + ts + '.' + crypto.createHmac('sha256', code).update('recovery.' + ts + '.*').digest('hex'); };
  const r14 = await call({ ip: '7.7.7.7', cookie: mk(6 * 86400000) });
  const renewed = recCookieOf(r14); const newTs = renewed ? +renewed.split('=')[1].split('.')[0] : 0;
  const sc = [].concat(r14.headers['set-cookie'] || []).join(';');
  const chain = await call({ ip: '8.8.8.8', cookie: renewed });   // الكوكي المجدد شغال من IP تاني
  const r16 = await call({ ip: '7.7.7.7', cookie: mk(8 * 86400000) });
  const forged = await call({ ip: '7.7.7.7', cookie: mk(0, 'X'.repeat(60)) });
  return isLogin(r14) && !!renewed && newTs > Date.now() - 5000 && /Max-Age=604800/.test(sc) && /HttpOnly/.test(sc) && /Secure/.test(sc) && isLogin(chain) && isClone(r16) && isClone(forged); }));

T('M11 الإرسال من اللوحة في stealth بالكوكي (من IP مختلف عن اللي فتح الرابط) + كوكي اللوحة → 200، من غير الكوكي → 404', async () => withEnv({ RECOVERY_IPS: '' }, async () => {
  store.set('panel_mode', 'stealth');
  const r1 = await call({ ip: '5.5.5.5', url: '/api/admin?recovery=' + CODE }); const ck = recCookieOf(r1);
  const ok = await send('6.6.6.6', { title: 'x', body: 'y' }, panelCookie() + '; ' + ck);
  const no = await send('6.6.6.6', { title: 'x', body: 'y' });
  return ok.status === 200 && isClone(no) && pushCalls.length === 1; }));

T('M12 لو RECOVERY_IPS متظبطة: الكوكي بيتربط بالـ IP (من IP تاني → 404 حتى لو توقيعه صح)', async () => withEnv({ RECOVERY_IPS: '3.3.3.3' }, async () => {
  store.set('panel_mode', 'stealth');
  const r1 = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE }); const ck = recCookieOf(r1);
  const same = await call({ ip: '3.3.3.3', cookie: ck }); const other = await call({ ip: '5.5.5.5', cookie: ck });
  const ts = String(Date.now()); const wild = 'recovery_ok=' + ts + '.' + crypto.createHmac('sha256', CODE).update('recovery.' + ts + '.*').digest('hex');
  const wildTry = await call({ ip: '3.3.3.3', cookie: wild });
  return passes(r1) && isLogin(same) && isClone(other) && isClone(wildTry); }));

const otpEmail = () => JSON.parse(emails[emails.length - 1]).html.match(/letter-spacing:6px">(\d{6})/)[1];
const cookieOf = (r, name) => { const c = [].concat(r.headers['set-cookie'] || []).find((x) => x.startsWith(name + '=')); return c ? c.split(';')[0] : ''; };
const banOf = (ip) => (store.get('ban:' + ip) ? JSON.parse(store.get('ban:' + ip)) : null);

T('R1 ?recovery= غلط → حظر دائم + 404 مقلّد (حتى في open)، تنبيه أمني، مرة واحدة بس (من غير إغراق)', async () => {
  const a = await call({ ip: '30.0.0.1', url: '/api/admin?recovery=' + 'z'.repeat(60) });
  const b = await call({ ip: '30.0.0.1', url: '/api/admin?recovery=nope' });
  const c = await call({ ip: '30.0.0.1' });
  store.set('panel_mode', 'stealth'); const d = await call({ ip: '30.0.0.2', url: '/api/admin?recovery=x' });
  return isClone(a) && isClone(b) && banOf('30.0.0.1').level === 'perm' && c.status === 429 && isClone(d) && banOf('30.0.0.2').level === 'perm'
    && tg.filter((x) => x.tok === 't' && x.text.includes('حظر دائم') && x.text.includes('30.0.0.1')).length === 1 && auditRows().some((x) => x.a === 'ban_perm' && x.target === '30.0.0.1'); });

T('R2 recovery غلط: OWNER والوايت ليست مابيتحظروش (404 + تنبيه)، والـ IPv6 على /64', async () => {
  store.set('whitelist:4.4.4.4', '{"addedAt":1}');
  const o = await call({ ip: '1.1.1.1', url: '/api/admin?recovery=bad' }); const w = await call({ ip: '4.4.4.4', url: '/api/admin?recovery=bad' });
  const v6 = await call({ ip: '2001:db8:9:9::1', url: '/api/admin?recovery=bad' }); const v6b = await call({ ip: '2001:db8:9:9:ffff::2' });
  return isClone(o) && isClone(w) && !store.has('ban:1.1.1.1') && !store.has('ban:4.4.4.4') && auditRows().filter((x) => x.a === 'recovery_bad').length === 2
    && banOf('2001:db8:9:9::').level === 'perm' && v6b.status === 429; });

T('R3 مفيش حظر: الميزة مقفولة (كود قصير)، ?recovery= فاضي، كوكي غلط/قديم، IP مجهول', async () => {
  await withEnv({ RECOVERY_CODE: 'short' }, async () => { await call({ ip: '31.0.0.1', url: '/api/admin?recovery=anything' }); });
  await call({ ip: '31.0.0.2', url: '/api/admin?recovery=' });
  await call({ ip: '31.0.0.3', cookie: 'recovery_ok=1.deadbeef' });
  await call({ ip: '', url: '/api/admin?recovery=bad' });
  return !store.has('ban:31.0.0.1') && !store.has('ban:31.0.0.2') && !store.has('ban:31.0.0.3') && ![...store.keys()].some((k) => k === 'ban:'); });

T('R4 محظور + الكود الصح (RECOVERY_IPS فاضية) → بيعدّي الحظر (فك الحظر بالرابط السري)', async () => withEnv({ RECOVERY_IPS: '' }, async () => {
  await call({ ip: '32.0.0.1', url: '/api/admin?recovery=bad' });   // اتحظر
  const blocked = await call({ ip: '32.0.0.1' });
  const r = await call({ ip: '32.0.0.1', url: '/api/admin?recovery=' + CODE }); const next = await call({ ip: '32.0.0.1', cookie: cookieOf(r, 'recovery_ok') });
  return blocked.status === 429 && passes(r) && isLogin(next); }));

T('R5 الكود الصح (GET) → 303 لـ /api/admin من غير الكود، كوكي HttpOnly/Secure/Lax، من غير referrer؛ POST بالكود مابيعملش redirect', async () => {
  const r = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE });
  const sc = [].concat(r.headers['set-cookie'] || []).join(';');
  const open = r.headers.location === '/api/admin' && !r.headers.location.includes(CODE) && r.body === '' && /HttpOnly/.test(sc) && /Secure/.test(sc) && /SameSite=Lax/.test(sc) && /Max-Age=604800/.test(sc) && r.headers['referrer-policy'] === 'no-referrer';
  store.set('panel_mode', 'stealth'); const r2 = await call({ ip: '3.3.3.3', url: '/api/admin?recovery=' + CODE });
  const p = await call({ ip: '3.3.3.3', method: 'POST', url: '/api/admin?recovery=' + CODE, body: { password: 'panelpass' } });
  return open && passes(r2) && p.status === 303 && p.redirect === '/api/admin'.replace('/api/admin', p.redirect) && !('' + p.redirect).includes(CODE); });

T('R6 قفل إرسال الرمز: ADMIN_PASSWORD مرتين ورا بعض → إيميل واحد بس والرمز الأول يفضل شغال؛ فشل الإرسال بيشيل القفل؛ بعد القفل يتبعت رمز جديد', async () => {
  const a = await call({ ip: '40.0.0.1', method: 'POST', body: { password: 'adminpass' } });
  const ck = cookieOf(a, 'panel_pending'); const code = otpEmail();
  const b = await call({ ip: '40.0.0.1', method: 'POST', body: { password: 'adminpass' } });
  const wrongPw = await call({ ip: '40.0.0.1', method: 'POST', body: { password: 'nope' } });
  const ok = await call({ ip: '40.0.0.1', method: 'POST', body: { code }, cookie: ck });
  const stillOne = emails.length === 1;
  store.delete('otp:lock:40.0.0.1'); const c = await call({ ip: '40.0.0.1', method: 'POST', body: { password: 'adminpass' } });
  // فشل الإرسال → القفل يتشال
  const realFetch = globalThis.fetch; globalThis.fetch = async (u, o) => (String(u).startsWith('https://api.resend.com') ? { ok: false, json: async () => ({}) } : realFetch(u, o));
  store.delete('otp:lock:40.0.0.1'); const f = await call({ ip: '40.0.0.1', method: 'POST', body: { password: 'adminpass' } }); globalThis.fetch = realFetch;
  return a.status === 200 && b.status === 429 && b.body.includes('name="code"') && !('set-cookie' in b.headers) && stillOne && wrongPw.status === 401 && ok.status === 303
    && c.status === 200 && emails.length === 2 && f.status === 502 && !store.has('otp:lock:40.0.0.1'); });

T('R7 وقف الساعة اتلغى: وايت ليست و OWNER بعد 20 رمز غلط مايتقفلوش، تنبيه كل 5، والـ IP العادي لسه بيتحظر بعد 5', async () => {
  store.set('whitelist:4.4.4.4', '{"addedAt":1}'); const outs = [];
  for (const ip of ['4.4.4.4', '1.1.1.1']) {
    for (let round = 0; round < 4; round++) {
      store.delete('otp:lock:' + ip); const a = await call({ ip, method: 'POST', body: { password: 'adminpass' } }); const ck = cookieOf(a, 'panel_pending');
      for (let i = 0; i < 5; i++) outs.push((await call({ ip, method: 'POST', body: { code: '000000' }, cookie: ck })).status);
    }
    store.delete('otp:lock:' + ip); const last = await call({ ip, method: 'POST', body: { password: 'adminpass' } }); outs.push(last.status);
  }
  const alerts = tg.filter((x) => x.tok === 't' && /غلط في رمز الأدمن|رمز أدمن غلط/.test(x.text)).length;
  const keys = [...store.keys()].some((k) => k.startsWith('wl:otp'));
  const a2 = await call({ ip: '41.0.0.1', method: 'POST', body: { password: 'adminpass' } }); const ck2 = cookieOf(a2, 'panel_pending'); let last2;
  for (let i = 0; i < 5; i++) last2 = await call({ ip: '41.0.0.1', method: 'POST', body: { code: '000000' }, cookie: ck2 });
  return outs.filter((s) => s === 401).length === 40 && outs.filter((s) => s === 200).length === 2 && !outs.includes(429) && !keys && alerts >= 8 && banOf('41.0.0.1').level === 'perm' && last2.status === 429; });

T('R8 SEND_KEY: 5 غلط → قفل ساعة؛ بعدها 5 غلط → حظر دائم؛ الوايت ليست: قفل بس؛ OWNER معفي؛ مفتاح صح بيصفّر العدّادات', async () => {
  const wrong = (ip, n) => (async () => { const o = []; for (let i = 0; i < n; i++) o.push((await send(ip, { title: 'x', body: 'y', sendKey: 'bad' + i })).status); return o; })();
  const a = await wrong('9.9.9.9', 5); const lockedRight = await send('9.9.9.9', { title: 'x', body: 'y' }); const locked = !!store.get('sendkey:lock:9.9.9.9');
  store.delete('sendkey:lock:9.9.9.9');   // عدّت الساعة
  const b = await wrong('9.9.9.9', 5); const banned = banOf('9.9.9.9');
  const after = await send('9.9.9.9', { title: 'x', body: 'y' });
  // وايت ليست
  store.set('whitelist:4.4.4.4', '{"addedAt":1}'); await wrong('4.4.4.4', 5); store.delete('sendkey:lock:4.4.4.4'); await wrong('4.4.4.4', 5);
  const wl = banOf('4.4.4.4'); const wlLocked = !!store.get('sendkey:lock:4.4.4.4');
  // OWNER
  const ow = await wrong('1.1.1.1', 12); const owOk = await send('1.1.1.1', { title: 'x', body: 'y' });
  // مفتاح صح بيصفّر
  await wrong('50.0.0.1', 4); const good = await send('50.0.0.1', { title: 'x', body: 'y' }); const reset1 = !store.has('sendkey:fail:50.0.0.1');
  store.set('sendkey:strikes:50.0.0.2', '1'); await send('50.0.0.2', { title: 'x', body: 'y' }); const reset2 = !store.has('sendkey:strikes:50.0.0.2');
  return a.every((s) => s === 401) && lockedRight.status === 429 && locked && b.every((s) => s === 401) && banned && banned.level === 'perm' && after.status === 429
    && !(wl && wl.level === 'perm') && wlLocked && ow.every((s) => s === 401) && owOk.status === 200 && good.status === 200 && reset1 && reset2
    && tg.some((x) => x.tok === 't' && x.text.includes('قفل ساعة')) && tg.some((x) => x.tok === 't' && x.text.includes('حظر دائم') && x.text.includes('SEND_KEY')); });

T('R9 أسماء متغيرات البوت الأمني: TELEGRAM_Notifications_* بس (القديمة مابتتستخدمش)', async () => {
  const saved = { a: process.env.TELEGRAM_Notifications_BOT_TOKEN, b: process.env.TELEGRAM_Notifications_CHAT_ID };
  process.env.TELEGRAM_BOT_TOKEN = 'OLDTOK'; process.env.TELEGRAM_CHAT_ID = 'OLDCHAT'; delete process.env.TELEGRAM_Notifications_BOT_TOKEN; delete process.env.TELEGRAM_Notifications_CHAT_ID; process.env.LOG_BOT_TOKEN = '';
  await call({ ip: '60.0.0.1', method: 'POST', body: { password: 'bad' } });   // أول محاولة فاشلة = تنبيه
  const silent = tg.length === 0;
  process.env.TELEGRAM_Notifications_BOT_TOKEN = saved.a; process.env.TELEGRAM_Notifications_CHAT_ID = saved.b;
  await call({ ip: '60.0.0.2', method: 'POST', body: { password: 'bad' } });
  delete process.env.TELEGRAM_BOT_TOKEN; delete process.env.TELEGRAM_CHAT_ID;
  return silent && tg.length === 1 && tg[0].tok === 't' && !tg.some((x) => x.tok === 'OLDTOK'); });

const catchall = (await import('/home/claude/api/[...catchall].js')).default;
const trap = (ip, extra = {}) => call({ ip, url: '/api/zzz-not-exist', opts: { trap: true }, ...extra });
const hrNow = () => Math.floor(Date.now() / 3600000);

T('C1 شبكة الصيد: curl/bot (من غير Sec-Fetch-Site) على مسار مش موجود → 404 مقلّد + حظر دائم + تنبيه مرة واحدة', async () => {
  const a = await trap('80.0.0.1'); const b = await trap('80.0.0.1', { url: '/api/wp-admin' }); const c = await trap('80.0.0.1', { method: 'POST', url: '/api/login' });
  const alerts = tg.filter((x) => x.tok === 't' && x.text.includes('مسار مش موجود') && x.text.includes('80.0.0.1')).length;
  const after = await call({ ip: '80.0.0.1' });
  return isClone(a) && isClone(b) && isClone(c) && banOf('80.0.0.1').level === 'perm' && alerts === 1 && after.status === 429 && auditRows().some((x) => x.a === 'ban_perm' && String(x.reason).includes('/api/zzz-not-exist')); });

T('C2 حماية من التسميم: طلب من متصفح (cross-site / same-origin / none) → 404 من غير حظر', async () => {
  const r = []; for (const v of ['cross-site', 'same-site', 'same-origin', 'none']) r.push(await trap('80.0.0.2', { headers: { 'sec-fetch-site': v } }));
  return r.every(isClone) && !store.has('ban:80.0.0.2'); });

T('C3 شبكة الصيد: OWNER والوايت ليست والـ IP المجهول مابيتحظروش (404 + تنبيه للموثوقين)', async () => {
  store.set('whitelist:4.4.4.4', '{"addedAt":1}');
  const o = await trap('1.1.1.1'); const w = await trap('4.4.4.4'); const u = await trap('');
  return isClone(o) && isClone(w) && isClone(u) && !store.has('ban:1.1.1.1') && !store.has('ban:4.4.4.4') && ![...store.keys()].some((k) => k === 'ban:')
    && auditRows().filter((x) => x.a === 'trap_hit').length === 2; });

T('C4 شبكة الصيد على IPv6: الحظر على الـ /64 كله، وبتشتغل حتى في stealth', async () => {
  store.set('panel_mode', 'stealth'); const r = await trap('2001:db8:8:8::1');
  store.set('panel_mode', 'open'); const other = await call({ ip: '2001:db8:8:8:ffff::7' }); const diff = await call({ ip: '2001:db8:8:9::1' });
  return isClone(r) && banOf('2001:db8:8:8::').level === 'perm' && other.status === 429 && isLogin(diff); });

T('C5 ملف api/[...catchall].js الحقيقي: بينادي الـ handler بـ trap (404 مقلّد + حظر)، والـ handler العادي مايتفعّلش بالـ header أو الـ query', async () => {
  const a = await call({ ip: '80.0.0.5', url: '/api/wp-login.php', fn: catchall });
  const spoof = await call({ ip: '80.0.0.6', url: '/api/admin?trap=1', headers: { 'x-trap': '1', 'x-catchall': 'true' } });
  return isClone(a) && banOf('80.0.0.5').level === 'perm' && isLogin(spoof) && !store.has('ban:80.0.0.6'); });

T('U1 فك الحظر الشامل: بيمسح ban + blacklist + sendkey fail/strikes/lock + rec:fail + otp:lock للـ IP ده بس', async () => {
  const mkKeys = (ip) => ['ban:' + ip, 'blacklist:' + ip, 'sendkey:fail:' + ip, 'sendkey:strikes:' + ip, 'sendkey:lock:' + ip, 'otp:lock:' + ip, 'rec:fail:' + ip + ':' + hrNow(), 'rec:fail:' + ip + ':' + (hrNow() - 1)];
  for (const ip of ['70.0.0.1', '70.0.0.2']) for (const k of mkKeys(ip)) store.set(k, '{"level":"perm"}');
  const r = await adminPost('1.1.1.1', { action: 'unban', ip: '70.0.0.1' });
  return r.status === 303 && mkKeys('70.0.0.1').every((k) => !store.has(k)) && mkKeys('70.0.0.2').every((k) => store.has(k))
    && auditRows().some((x) => x.a === 'unban' && x.target === '70.0.0.1') && tg.some((x) => x.tok === 't' && x.text.includes('فك حظر شامل')); });

T('U2 حظر يدوي: سوداء + ban دائم، والـ IP بيتقفل (403)، وبيترفض على الـ IP الحالي وOWNER_IPS', async () => {
  const r = await adminPost('1.1.1.1', { action: 'manual_ban', ip: '71.0.0.1', reason: 'سبب تجريبي' });
  const bl = JSON.parse(store.get('blacklist:71.0.0.1')); const g = await call({ ip: '71.0.0.1' });
  const dflt = await adminPost('1.1.1.1', { action: 'manual_ban', ip: '71.0.0.2' });
  const self = await adminPost('9.9.9.9', { action: 'manual_ban', ip: '9.9.9.9' }); const owner = await adminPost('9.9.9.9', { action: 'manual_ban', ip: '1.1.1.1' });
  return r.status === 303 && bl.reason === 'سبب تجريبي' && banOf('71.0.0.1').level === 'perm' && g.status === 403 && JSON.parse(store.get('blacklist:71.0.0.2')).reason === 'حظر يدوي'
    && self.status === 400 && owner.status === 400 && !store.has('blacklist:9.9.9.9') && !store.has('ban:1.1.1.1') && auditRows().some((x) => x.a === 'manual_ban' && x.target === '71.0.0.1'); });

T('U3 /64: حظر يدوي لـ IPv6 بيقفل الـ /64 كله، وفك الحظر من أي عنوان فيه (أو بـ /64) بيمسح العدّادات برضه', async () => {
  await adminPost('1.1.1.1', { action: 'manual_ban', ip: '2001:db8:7:7::5' });
  store.set('sendkey:strikes:2001:db8:7:7::', '1'); store.set('sendkey:lock:2001:db8:7:7::', '1');
  const blocked = await call({ ip: '2001:db8:7:7:aaaa::1' }); const otherNet = await call({ ip: '2001:db8:7:8::1' });
  await adminPost('1.1.1.1', { action: 'unban', ip: '2001:db8:7:7:bbbb::2' });
  const open = await call({ ip: '2001:db8:7:7:aaaa::1' });
  await adminPost('1.1.1.1', { action: 'manual_ban', ip: '2001:db8:7:7::/64' }); const again = await call({ ip: '2001:db8:7:7:cccc::3' });
  return blocked.status === 403 && isLogin(otherNet) && isLogin(open) && !store.has('sendkey:strikes:2001:db8:7:7::') && !store.has('sendkey:lock:2001:db8:7:7::') && again.status === 403 && store.has('blacklist:2001:db8:7:7::'); });

T('U4 الواجهة: صندوق الحظر السريع في أول الشاشة، وأزرار 🚫/🔓 جنب كل IP في كل الجداول، والضغط بيملا الـ form ويتبعت (والإلغاء مابيبعتش)', async () => {
  store.set('whitelist:4.4.4.4', '{"addedAt":1}'); store.set('panel_ip:7.7.7.7', '{"addedAt":1}'); store.set('blacklist:8.8.8.8', '{"reason":"x"}');
  store.set('ban:6.6.6.6', JSON.stringify({ level: 'perm' })); store.set('notif:5.5.5.5', '3'); store.set('notif:last:5.5.5.5', String(Date.now()));
  const html = await adminPage(); const sec = (h) => html.split('<h2').find((x) => x.slice(0, 80).includes(h)) || '';
  const both = (s, ip) => s.includes('data-act="manual_ban" data-ip="' + ip + '"') && s.includes('data-act="unban" data-ip="' + ip + '"');
  const top = html.indexOf('حظر / فك حظر سريع') > 0 && html.indexOf('حظر / فك حظر سريع') < html.indexOf('وضع اللوحة') && html.includes('name="action" value="manual_ban"') && html.includes('name="action" value="unban"');
  const pg = runPage(html); pg.setConfirm(false); pg.click('manual_ban', '9.9.9.7'); const cancelled = !pg.els.qf || !pg.els.qf.submitted;
  pg.setConfirm(true); pg.click('manual_ban', '9.9.9.7');
  const f = { action: pg.els.qfa.value, ip: pg.els.qfi.value, reason: pg.els.qfr.value }; const sent = pg.els.qf.submitted;
  const r = await adminPost('1.1.1.1', f); const pg2 = runPage(html); pg2.click('unban', '9.9.9.7');
  return top && both(sec('القائمة البيضاء'), '4.4.4.4') && both(sec('IPs المسموح لها بالدخول'), '7.7.7.7') && both(sec('القائمة السوداء'), '8.8.8.8')
    && both(sec('المحظورين تلقائيًا'), '6.6.6.6') && both(sec('الإشعارات المرسلة لكل IP'), '5.5.5.5') && cancelled && sent && f.action === 'manual_ban' && f.ip === '9.9.9.7'
    && r.status === 303 && banOf('9.9.9.7').level === 'perm' && pg2.els.qfa.value === 'unban'; });

let pass = 0;
for (const [n, f] of tests) {
  reset(); let ok = false, err = '';
  try { ok = await f(); } catch (e) { err = ' — ' + (e && e.stack ? e.stack.split('\n').slice(0, 2).join(' | ') : e); }
  if (ok) pass++;
  console.log((ok ? '✅ ' : '❌ ') + n + err);
}
console.log(`\n${pass}/${tests.length} passed`);
process.exit(pass === tests.length ? 0 : 1);
