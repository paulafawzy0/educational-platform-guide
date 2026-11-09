import fs from 'fs';
import crypto from 'crypto';
const src = fs.readFileSync('./admin.mjs', 'utf8').replace(/\r\n/g, '\n');
const grab = (name) => {
  const start = src.indexOf('const ' + name + ' = `');
  const from = src.indexOf('`', start) + 1;
  const to = src.indexOf('`;', from);
  return src.slice(from, to);
};
for (const n of ['PANEL_HTML', 'LOGIN_HTML']) console.log(n, crypto.createHash('sha256').update(grab(n)).digest('hex'));
